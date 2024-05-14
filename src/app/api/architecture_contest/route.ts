import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

import Architect from '@/models/architect'
import ArchitectureContest from '@/models/architectureContest'
import connectMongo from '@/utils/connectMongo'
import { convertToArchitectPortfolio } from '@/utils/architectureContest'
import { ArchitectureContest as TArchitectureContest } from '@/types/content'

export async function GET() {
  connectMongo()

  try {
    const architectureContests = await ArchitectureContest.findAll()

    return NextResponse.json(architectureContests, { status: 200 })
  } catch (e) {
    return NextResponse.json('건축 콘테스트 찾기 실패', { status: 400 })
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

  const body: TArchitectureContest = await req.json()

  connectMongo()

  try {
    await ArchitectureContest.create(body)
  } catch (e) {
    return NextResponse.json(e, { status: 400 })
  }

  try {
    const architects = convertToArchitectPortfolio(body)

    architects.forEach(async (architect) => {
      await Architect.pushArchitectureContestToPortfolio(architect.minecraft_id, architect.portfolio)
    })

    return NextResponse.json('성공', { status: 200 })
  } catch (e) {
    return NextResponse.json('건축가 포트폴리오에 추가 실패', { status: 400 })
  }
}

export async function PUT(req: NextRequest) {
  const token = req.cookies.get('jwt')?.value

  if (!token) {
    return NextResponse.json('토큰이 없습니다', { status: 400 })
  }

  const isValidatedToken = jwt.verify(token, process.env.JWT_SECRET as string)

  if (!isValidatedToken) {
    return NextResponse.json('토큰이 유효하지 않습니다.', { status: 400 })
  }

  const body: TArchitectureContest = await req.json()

  connectMongo()

  try {
    await ArchitectureContest.updateArchitectureContest(body)
  } catch (e) {
    return NextResponse.json(e, { status: 400 })
  }

  try {
    const architects = convertToArchitectPortfolio(body)

    architects.forEach(async (architect) => {
      await Architect.updateArchitectureContestYoutubeURL(
        architect.minecraft_id,
        architect.portfolio.episode,
        architect.portfolio.youtube_url,
      )
    })

    return NextResponse.json('성공', { status: 200 })
  } catch (e) {
    return NextResponse.json('건축가 포트폴리오 수정 실패', { status: 400 })
  }
}
