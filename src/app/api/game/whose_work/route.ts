import { NextRequest, NextResponse } from 'next/server'

import Architect from '@/models/architect'
import WhoseWork from '@/models/whoseWork'
import connectMongo from '@/utils/connectMongo'
import { Architect as TArchitect } from '@/types/architect'
import { Difficulty, NumberOfArchitecture } from '@/types/whoseWork'

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = new URL(req.url)

    const difficulty = searchParams.get('difficulty')
    const numberOfArchitecture = searchParams.get('numberOfArchitecture')

    connectMongo()

    if (difficulty && numberOfArchitecture) {
      const whoseWork = await WhoseWork.findByDifficultyAndNumberOfArchitecture(
        difficulty as Difficulty,
        parseInt(numberOfArchitecture) as NumberOfArchitecture,
      )

      return NextResponse.json(
        {
          serviceCode: 200101,
          data: whoseWork,
          message: '누구의 작품 찾기 성공',
        },
        { status: 200 },
      )
    }

    if (difficulty === 'LOW') {
      const res = [...(await Architect.findByTier('hacker')), ...(await Architect.findByTier('gukbap'))]

      return NextResponse.json(
        {
          serviceCode: 200101,
          data: convertToGameObject(res),
          message: '난이도 낮음 찾기 성공',
        },
        { status: 200 },
      )
    }

    if (difficulty === 'MEDIUM') {
      const res = [
        ...(await Architect.findByTier('gukbap')),
        ...(await Architect.findByTier('pro')),
        ...(await Architect.findByTier('gyeruik')),
      ]

      return NextResponse.json(
        {
          serviceCode: 200101,
          data: convertToGameObject(res),
          message: '난이도 중간 찾기 성공',
        },
        { status: 200 },
      )
    }

    if (difficulty === 'HIGH') {
      const res = await Architect.findAll()
      return NextResponse.json(
        {
          serviceCode: 200101,
          data: convertToGameObject(res),
          message: '난이도 어려움 찾기 성공',
        },
        { status: 200 },
      )
    }

    return NextResponse.json({ serviceCode: 400200, message: '난이도를 입력하지 않았습니다' }, { status: 400 })
  } catch (e) {
    return NextResponse.json({ serviceCode: 400100, message: '누구의 작품 찾기 실패', error: e }, { status: 400 })
  }
}

export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = new URL(req.url)

    const difficulty = searchParams.get('difficulty')
    const numberOfArchitecture = searchParams.get('numberOfArchitecture')
    const correctCount = searchParams.get('correctCount')

    if (!difficulty) return

    if (!numberOfArchitecture) return

    if (!correctCount) return

    connectMongo()

    const res = await WhoseWork.increaseCorrectAnswerCount(
      difficulty,
      parseInt(numberOfArchitecture),
      parseInt(correctCount),
    )

    return NextResponse.json(
      {
        serviceCode: 201101,
        data: res,
        message: '누구의 작품 수정 완료',
      },
      { status: 200 },
    )
  } catch (e) {
    return NextResponse.json({ serviceCode: 400102, message: '누구의 작품 수정 실패', error: e }, { status: 400 })
  }
}

const convertToGameObject = (arr: TArchitect[]) => {
  return arr
    .map((architect) =>
      [
        ...architect.portfolio.noobprohacker.map((item) => ({
          image_url: item.image_url,
          minecraft_id: architect.minecraft_id,
        })),
        ,
        ...architect.portfolio.eventNoobProHacker
          .filter((item) => item.episode !== 5)
          .filter((item) => item.episode !== 3)
          .map((item) => ({
            image_url: item.image_url,
            minecraft_id: architect.minecraft_id,
          })),
        ,
        ...architect.portfolio.architectureContest.map((item) => ({
          image_url: item.image_url,
          minecraft_id: architect.minecraft_id,
        })),
        ...architect.portfolio.architectureNoobProHacker.map((item) => ({
          image_url: item.image_url,
          minecraft_id: architect.minecraft_id,
        })),
      ].filter((item) => item),
    )
    .flat()
}
