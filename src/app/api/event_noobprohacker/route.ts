import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

import Architect from '@/models/architect'
import connectMongo from '@/utils/connectMongo'
import { EventNoobProHacker as TEventNoobProHacker } from '@/types/content'
import EventNoobProHacker from '@/models/eventNoobProHacker'
import { convertToArchitectPortfolio } from '@/utils/eventNoobProHacker'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const lastestOne = searchParams.get('lastestOne')

  if (lastestOne === 'true') {
    try {
      connectMongo()

      const eventNoobProHacker = await EventNoobProHacker.findLastestOne()

      return NextResponse.json(
        { serviceCode: 200101, data: eventNoobProHacker, message: '최근 이벤트 눕프핵 찾기 성공' },
        {
          status: 200,
        },
      )
    } catch (e) {
      return NextResponse.json(
        { serviceCode: 400100, message: '최근 이벤트 눕프핵 찾기 실패', error: e },
        { status: 400 },
      )
    }
  }

  try {
    connectMongo()

    const eventNoobProHackers = await EventNoobProHacker.findAll()

    return NextResponse.json(
      {
        serviceCode: 200101,
        data: eventNoobProHackers,
        message: '모든 이벤트 눕프핵 찾기 성공',
      },
      { status: 200 },
    )
  } catch (e) {
    return NextResponse.json({ serviceCode: 400100, message: '이벤트 눕프핵 찾기 실패', error: e }, { status: 400 })
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

  const body: TEventNoobProHacker = await req.json()

  connectMongo()

  try {
    await EventNoobProHacker.create(body)
  } catch (e) {
    return NextResponse.json({ serviceCode: 400101, message: '이벤트 눕프핵 추가 실패', error: e }, { status: 400 })
  }

  try {
    const architects = convertToArchitectPortfolio(body)

    architects.forEach(async (architect) => {
      await Architect.pushEventNoobProHackerToPortfolio(architect.minecraft_id, architect.portfolio)
    })

    return NextResponse.json({ serviceCode: 201100, message: '이벤트 눕프핵 추가 성공' }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ serviceCode: 400101, message: '건축가 포트폴리오 추가 실패', error: e }, { status: 400 })
  }
}

export async function PUT(req: NextRequest) {
  const token = req.cookies.get('jwt')?.value

  if (!token) {
    return NextResponse.json({ serviceCode: 403100 }, { status: 403 })
  }

  const isValidatedToken = jwt.verify(token, process.env.JWT_SECRET as string)

  if (!isValidatedToken) {
    return NextResponse.json({ serviceCode: 403101 }, { status: 403 })
  }

  const body: TEventNoobProHacker = await req.json()

  connectMongo()

  try {
    await EventNoobProHacker.updateEventNoobProHacker(body)
  } catch (e) {
    return NextResponse.json({ serviceCode: 400102, message: '이벤트 눕프핵 수정 실패', error: e }, { status: 400 })
  }

  try {
    const architects = convertToArchitectPortfolio(body)

    architects.forEach(async (architect) => {
      await Architect.updateContentYoutubeUrl(
        architect.minecraft_id,
        architect.portfolio.episode,
        'eventNoobProHacker',
        architect.portfolio.youtube_url,
      )
    })

    return NextResponse.json({ serviceCode: 201101, message: '이벤트 눕프핵 수정 성공' }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ serviceCode: 400102, message: '건축가 포트폴리오 수정 실패', error: e }, { status: 400 })
  }
}
