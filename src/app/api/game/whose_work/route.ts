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

      return NextResponse.json(whoseWork, { status: 200 })
    }

    if (difficulty === 'LOW') {
      const res = [...(await Architect.findByTier('hacker')), ...(await Architect.findByTier('gukbap'))]

      return NextResponse.json(convertToGameObject(res), { status: 200 })
    }

    if (difficulty === 'MEDIUM') {
      const res = [
        ...(await Architect.findByTier('gukbap')),
        ...(await Architect.findByTier('pro')),
        ...(await Architect.findByTier('gyeruik')),
      ]

      return NextResponse.json(convertToGameObject(res), { status: 200 })
    }

    if (difficulty === 'HIGH') {
      const res = await Architect.findAll()
      return NextResponse.json(convertToGameObject(res), { status: 200 })
    }

    return NextResponse.json(JSON.stringify({ message: 'query를 입력해주세요' }), {
      status: 400,
    })
  } catch (e) {
    return NextResponse.json(JSON.stringify({ message: 'error' }), {
      status: 400,
    })
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

    return NextResponse.json(res, { status: 200 })
  } catch (e) {
    return NextResponse.json('error', { status: 400 })
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
