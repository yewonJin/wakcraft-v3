import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

import Architect from '@/models/architect'
import connectMongo from '@/utils/connectMongo'
import { EventNoobProHacker as TEventNoobProHacker } from '@/types/content'
import EventNoobProHacker from '@/models/eventNoobProHacker'
import { convertToArchitectPortfolio } from '@/utils/eventNoobProHacker'

export async function POST(req: NextRequest) {
  const token = req.cookies.get('jwt')?.value

  if (!token) {
    return NextResponse.json('토큰이 없습니다', { status: 400 })
  }

  const isValidatedToken = jwt.verify(token, process.env.JWT_SECRET as string)

  if (!isValidatedToken) {
    return NextResponse.json('토큰이 유효하지 않습니다.', { status: 400 })
  }

  const body: TEventNoobProHacker = await req.json()

  connectMongo()

  try {
    await EventNoobProHacker.create(body)
  } catch (e) {
    return NextResponse.json(e, { status: 400 })
  }

  try {
    const architects = convertToArchitectPortfolio(body)

    architects.forEach(async (architect) => {
      await Architect.pushEventNoobProHackerToPortfolio(architect.minecraft_id, architect.portfolio)
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

  const body: TEventNoobProHacker = await req.json()

  connectMongo()

  try {
    await EventNoobProHacker.updateEventNoobProHacker(body)
  } catch (e) {
    return NextResponse.json('이벤트 눕프핵 수정 실패', { status: 400 })
  }

  try {
    const architects = convertToArchitectPortfolio(body)

    architects.forEach(async (architect) => {
      await Architect.updateEventNoobProHackerYoutubeURL(
        architect.minecraft_id,
        architect.portfolio.episode,
        architect.portfolio.youtube_url,
      )
    })

    return NextResponse.json('성공', { status: 200 })
  } catch (e) {
    return NextResponse.json('건축가 유튜브 링크 수정 실패', { status: 400 })
  }
}
