import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

import PlacementTest from '@/models/placementTest'
import connectMongo from '@/utils/connectMongo'
import Architect from '@/models/architect'
import { PlacementTest as TPlacementTest } from '@/types/content'
import { convertToArchitectPortfolio } from '@/utils/placementTest'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const isRequestCurSeason = searchParams.get('curSeason')

  if (isRequestCurSeason === 'true') {
    try {
      connectMongo()

      const placementTest = await PlacementTest.findLastestOne()

      return NextResponse.json(placementTest[0].season, { status: 200 })
    } catch (e) {
      return NextResponse.json('현재 시즌 fetch 실패', { status: 400 })
    }
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get('jwt')?.value

  if (!token) {
    return NextResponse.json('토큰이 없습니다', { status: 400 })
  }

  const isValidatedToken = jwt.verify(token, process.env.JWT_SECRET as string)

  if (!isValidatedToken) {
    return NextResponse.json('토큰이 유효하지 않습니다.', { status: 400 })
  }

  const body: TPlacementTest = await req.json()

  try {
    connectMongo()

    const placementTest = await PlacementTest.create(body)

    // 시즌 새로 시작하기
    await Architect.updateAllToUnranked()

    convertToArchitectPortfolio(body).forEach(async (architect) => {
      // 포르폴리오에 추가
      await Architect.pushPlacementTestToPortfolio(architect.minecraft_id, architect.portfolio)

      // 현재 티어 업데이트
      await Architect.updateCurTier(architect.minecraft_id, architect.portfolio.placement_result)

      // 시즌 티어 업데이트
      await Architect.updateSeasonTier(
        architect.minecraft_id,
        architect.portfolio.season,
        architect.portfolio.placement_result,
      )
    })

    return NextResponse.json(placementTest, { status: 200 })
  } catch (e) {
    return NextResponse.json(e, { status: 400 })
  }
}
