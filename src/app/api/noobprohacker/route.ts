import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

import NoobProHacker from '@/models/noobprohacker'
import Architect from '@/models/architect'
import Worldcup from '@/models/worldCup'
import connectMongo from '@/utils/connectMongo'
import { createWorldcup } from '@/utils/worldcup'
import { convertToNoobProHackerPortfolio } from '@/utils/noobprohacker'
import { NoobProHacker as TNoobProHacker } from '@/types/content'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const isRequestTheOnesWithoutURL = searchParams.get('withoutURL')

  if (isRequestTheOnesWithoutURL === 'true') {
    try {
      connectMongo()

      const noobprohacker = await NoobProHacker.findOneThatHasNotURL()

      return NextResponse.json(noobprohacker, { status: 200 })
    } catch (e) {
      return NextResponse.json('유튜브 링크 없는 눕프핵 fetch 실패')
    }
  }

  try {
    connectMongo()

    const noobprohacker = await NoobProHacker.findLastestOne()

    return NextResponse.json(noobprohacker, {
      status: 200,
    })
  } catch (e) {
    return NextResponse.json('눕프핵 fetch 실패', { status: 400 })
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

  const body: TNoobProHacker = await req.json()

  connectMongo()

  try {
    await NoobProHacker.create(body)
  } catch (e) {
    return NextResponse.json('눕프핵 추가 실패', { status: 400 })
  }

  try {
    const architects = convertToNoobProHackerPortfolio(body)

    architects.forEach(async (architect) => {
      await Architect.pushNoobProHackerToPortfolio(architect.minecraft_id, architect.portfolio)

      if (architect.portfolio.line === '해커') {
        await Worldcup.create(createWorldcup(architect))
      }
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

  const body: TNoobProHacker = await req.json()

  connectMongo()

  try {
    await NoobProHacker.updateNoobProHacker(body)
  } catch (e) {
    return NextResponse.json('눕프핵 수정 실패', { status: 400 })
  }

  try {
    const hackers = body.lineInfo.map((item) => ({
      subject: item.subject,
      youtube_url: item.line_details[2].youtube_url,
    }))

    hackers.forEach(async (hacker) => {
      await Worldcup.updateYoutubeURL(hacker.subject, hacker.youtube_url)
    })
  } catch (e) {
    return NextResponse.json('월드컵 유튜브 링크 수정 실패', { status: 400 })
  }

  try {
    const architects = convertToNoobProHackerPortfolio(body)

    architects.forEach(async (architect) => {
      await Architect.updateNoobProHackerYoutubeURL(
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
