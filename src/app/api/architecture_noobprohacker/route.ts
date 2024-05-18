import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

import Architect from '@/models/architect'
import connectMongo from '@/utils/connectMongo'
import { convertToNoobProHackerPortfolio } from '@/utils/noobprohacker'
import { NoobProHacker as TNoobProHacker } from '@/types/content'
import ArchitectureNoobProHacker from '@/models/architectureNoobProHacker'
import { NoobProHacker as TArchitectureNoobProHacker } from '@/types/content'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const withoutYoutubeLink = searchParams.get('withoutYoutubeLink')

  if (withoutYoutubeLink === 'true') {
    try {
      connectMongo()

      const architectureNoobProHacker = await ArchitectureNoobProHacker.findAllWithoutYoutubeLink()

      return NextResponse.json(
        { serviceCode: 200101, data: architectureNoobProHacker, message: '건축 눕프핵 찾기 성공' },
        { status: 200 },
      )
    } catch (e) {
      return NextResponse.json({ serviceCode: 400100, message: '건축가 눕프핵 찾기 실패', error: e }, { status: 400 })
    }
  }

  const lastestOne = searchParams.get('lastestOne')

  if (lastestOne === 'true') {
    try {
      connectMongo()

      const architectureNoobProHacker = await ArchitectureNoobProHacker.findLastestOne()

      return NextResponse.json(
        { serviceCode: 200101, data: architectureNoobProHacker, message: '최근 건축 눕프핵 찾기 성공' },
        {
          status: 200,
        },
      )
    } catch (e) {
      return NextResponse.json(
        { serviceCode: 400100, message: '최근 건축 눕프핵 찾기 실패', error: e },
        { status: 400 },
      )
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

  const body: TNoobProHacker = await req.json()

  connectMongo()

  try {
    await ArchitectureNoobProHacker.create(body)
  } catch (e) {
    return NextResponse.json({ serviceCode: 400101, message: '건축 눕프핵 추가 실패', error: e }, { status: 400 })
  }

  try {
    const architects = convertToNoobProHackerPortfolio(body)

    architects.forEach(async (architect) => {
      await Architect.pushArchitectureNoobProHackerToPortfolio(architect.minecraft_id, architect.portfolio)
    })

    return NextResponse.json({ serviceCode: 201100, message: '건축 눕프핵 추가 성공' }, { status: 201 })
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

  const body: TArchitectureNoobProHacker = await req.json()

  connectMongo()

  try {
    await ArchitectureNoobProHacker.updateArchitectureNoobProHacker(body)
  } catch (e) {
    return NextResponse.json({ serviceCode: 400102, message: '건축 눕프핵 수정 실패', error: e }, { status: 400 })
  }

  try {
    const architects = convertToNoobProHackerPortfolio(body)

    architects.forEach(async (architect) => {
      await Architect.updateContentYoutubeUrl(
        architect.minecraft_id,
        architect.portfolio.episode,
        'architectureNoobProHacker',
        architect.portfolio.youtube_url,
      )
    })

    return NextResponse.json({ serviceCode: 201101, message: '건축 눕프핵 추가 성공' }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ serviceCode: 400102, message: '건축가 포트폴리오 수정 실패', error: e }, { status: 400 })
  }
}
