import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

import Architect from '@/models/architect'
import ArchitectureContest from '@/models/architectureContest'
import connectMongo from '@/utils/connectMongo'
import { convertToArchitectPortfolio } from '@/utils/architectureContest'
import { ArchitectureContest as TArchitectureContest } from '@/types/content'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const lastestOne = searchParams.get('lastestOne')

  if (lastestOne === 'true') {
    try {
      connectMongo()

      const architectureContest = await ArchitectureContest.findLastestOne()

      return NextResponse.json(
        { serviceCode: 200101, data: architectureContest, message: '최근 건축 콘테스트 찾기 성공' },
        {
          status: 200,
        },
      )
    } catch (e) {
      return NextResponse.json(
        { serviceCode: 400100, message: '최근 건축 콘테스트 찾기 실패', error: e },
        { status: 400 },
      )
    }
  }

  try {
    connectMongo()

    const architectureContests = await ArchitectureContest.findAll()

    return NextResponse.json(
      { serviceCode: 200101, data: architectureContests, message: '건축가 찾기 성공' },
      { status: 200 },
    )
  } catch (e) {
    return NextResponse.json({ serviceCode: 400100, msg: e }, { status: 400 })
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

  const body: TArchitectureContest = await req.json()

  connectMongo()

  try {
    await ArchitectureContest.create(body)
  } catch (e) {
    return NextResponse.json({ serviceCode: 400101 }, { status: 400 })
  }

  try {
    const architects = convertToArchitectPortfolio(body)

    architects.forEach(async (architect) => {
      await Architect.pushArchitectureContestToPortfolio(architect.minecraft_id, architect.portfolio)
    })

    return NextResponse.json({ serviceCode: 201100, message: '건축 콘테스트 추가 성공' }, { status: 201 })
  } catch (e) {
    return NextResponse.json(
      { serviceCode: 400101, message: '건축가 포트폴리오에 추가 실패', error: e },
      { status: 400 },
    )
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

  const body: TArchitectureContest = await req.json()

  connectMongo()

  try {
    await ArchitectureContest.updateArchitectureContest(body)
  } catch (e) {
    return NextResponse.json({ serviceCode: 400102, message: '건축 콘테스트 수정 실패', error: e })
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

    return NextResponse.json({ serviceCode: 201101, message: '건축 콘테스트 추가 성공' }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ serviceCode: 400102, message: '건축가 포트폴리오 수정 실패', error: e }, { status: 400 })
  }
}
