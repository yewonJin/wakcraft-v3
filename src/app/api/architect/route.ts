import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

import connectMongo from '@/utils/connectMongo'
import Architect from '@/models/architect'
import PlacementTest from '@/models/placementTest'
import NoobProHacker from '@/models/noobprohacker'
import ArchitectureContest from '@/models/architectureContest'
import GuessTime from '@/models/guessTime'
import MatchYourTier from '@/models/matchYourTier'
import EventNoobProHacker from '@/models/eventNoobProHacker'
import Worldcup from '@/models/worldCup'
import ArchitectureNoobProHacker from '@/models/architectureNoobProHacker'

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = new URL(req.url)

    const minecraftId = searchParams.get('minecraftId')

    connectMongo()

    if (minecraftId) {
      const architect = await Architect.findByMinecraftId(minecraftId)

      return NextResponse.json(architect, { status: 200 })
    }

    const architects = await Architect.findAll()

    return NextResponse.json(architects, { status: 200 })
  } catch (e) {
    return NextResponse.json(JSON.stringify({ message: 'error' }), {
      status: 400,
    })
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

  try {
    const { minecraft_id, wakzoo_id } = await req.json()

    connectMongo()

    const currentSeason = (await PlacementTest.findAll()).length

    const architect = await Architect.create({
      minecraft_id,
      wakzoo_id,
      curTier: '언랭',
      tier: new Array(currentSeason).fill('언랭'),
    })

    return NextResponse.json(architect, { status: 200 })
  } catch (e) {
    return NextResponse.json(JSON.stringify({ message: 'error' }), {
      status: 400,
    })
  }
}

export async function PATCH(req: NextRequest) {
  const token = req.cookies.get('jwt')?.value

  if (!token) {
    return NextResponse.json('토큰이 없습니다', { status: 400 })
  }

  const isValidatedToken = jwt.verify(token, process.env.JWT_SECRET as string)

  if (!isValidatedToken) {
    return NextResponse.json('토큰이 유효하지 않습니다.', { status: 400 })
  }

  try {
    const { beforeId, afterId, wakzoo_id, curTier } = await req.json()

    connectMongo()

    await Architect.updateWakzooId(beforeId, wakzoo_id)
    await Architect.updateCurTier(beforeId, curTier)

    if (beforeId !== afterId) {
      const architect = await Architect.findByMinecraftId(beforeId)

      // 눕프로해커에서 마인크래프트 아이디 업데이트하기
      architect.portfolio.noobprohacker.forEach(async (item) => {
        await NoobProHacker.updateArchitectId(item.episode, item.subject, beforeId, afterId)
      })

      architect.portfolio.architectureNoobProHacker.forEach(async (item) => {
        await ArchitectureNoobProHacker.updateArchitectId(item.episode, item.subject, beforeId, afterId)
      })

      // 배치고사에서 마인크래프트 아이디 업데이트하기
      architect.portfolio.placementTest.forEach(async (item) => {
        await PlacementTest.updateArchitectId(item.season, beforeId, afterId)
      })

      // 치즐건콘에서 마인크래프트 아이디 업데이트하기
      architect.portfolio.architectureContest.forEach(async (item) => {
        await ArchitectureContest.updateArchitectId(item.episode, item.line, beforeId, afterId)
      })

      // 이벤트 눕프핵에서 마인크래프트 아이디 업데이트하기
      architect.portfolio.eventNoobProHacker.forEach(async (item) => {
        if (item.contentName === '시간 맞추기') {
          await GuessTime.updateArchitectId(item.episode, beforeId, afterId)
        } else if (item.contentName === '티어 맞추기') {
          await MatchYourTier.updateArchitectId(item.episode, beforeId, afterId)
        }
        {
          await EventNoobProHacker.pullArchitectId(item.episode, item.subject, item.line, beforeId)
          await EventNoobProHacker.pushArchitectId(item.episode, item.subject, item.line, afterId)
        }
      })

      await Worldcup.updateMinecraftId(beforeId, afterId)

      await Architect.updateMinecraftId(beforeId, afterId)
    }

    return NextResponse.json({ message: '정보 변경 성공' }, { status: 200 })
  } catch (e) {
    return NextResponse.json(
      { serviceCode: 2001 },
      {
        status: 400,
      },
    )
  }
}
