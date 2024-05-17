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

      return NextResponse.json(
        {
          serviceCode: 200101,
          data: placementTest[0].season,
          message: '현재 시즌 찾기 성공',
        },
        { status: 200 },
      )
    } catch (e) {
      return NextResponse.json({ serviceCode: 400100, message: '현재 시즌 찾기 실패', error: e }, { status: 400 })
    }
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get('jwt')?.value

  if (!token) {
    return NextResponse.json({ serviceCode: 403100 }, { status: 403 })
  }

  const isValidatedToken = jwt.verify(token, process.env.JWT_SECRET as string)

  if (!isValidatedToken) {
    return NextResponse.json({ serviceCode: 403101 }, { status: 403 })
  }

  const body: TPlacementTest = await req.json()

  connectMongo()

  try {
    await PlacementTest.create(body)
  } catch (e) {
    return NextResponse.json({ serviceCode: 400101, message: '배치고사 추가 실패', error: e }, { status: 400 })
  }

  try {
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

    return NextResponse.json(
      {
        serviceCode: 201100,
        message: '배치고사 추가 성공',
      },
      { status: 201 },
    )
  } catch (e) {
    return NextResponse.json(
      { serviceCode: 400102, message: '건축가 티어 및 포트폴리오 수정 실패', error: e },
      { status: 400 },
    )
  }
}
