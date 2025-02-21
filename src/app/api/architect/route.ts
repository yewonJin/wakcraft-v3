import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

import connectMongo from '@/utils/connectMongo'
import Architect from '@/models/architect'
import PlacementTest from '@/models/placementTest'
import NoobProHacker from '@/models/noobprohacker'
import ArchitectureContest from '@/models/architectureContest'
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

      return NextResponse.json(
        { serviceCode: 200101, data: architect, message: '해당 건축가 찾기 성공' },
        { status: 200 },
      )
    }

    const architects = await Architect.findAll()

    return NextResponse.json(
      { serviceCode: 200101, data: architects, message: '건축가 모두 찾기 성공' },
      { status: 200 },
    )
  } catch (e) {
    return NextResponse.json({ serviceCode: 400100, message: '건축가 찾기 실패', error: e }, { status: 400 })
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get('jwt')?.value

  if (!token) {
    return NextResponse.json({ serviceCode: 403100 }, { status: 403 })
  }

  const isValidatedToken = jwt.verify(token, process.env.JWT_SECRET as string)

  if (!isValidatedToken) {
    return NextResponse.json({ serviceCode: 403101 }, { status: 400 })
  }

  try {
    const { minecraft_id, wakzoo_id } = await req.json()

    connectMongo()

    const currentSeason = (await PlacementTest.findAll()).length

    await Architect.create({
      minecraft_id,
      wakzoo_id,
      curTier: '언랭',
      tier: new Array(currentSeason).fill('언랭'),
    })

    return NextResponse.json({ serviceCode: 201100, message: '건축가 추가 성공' }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ serviceCode: 400101, message: '건축가 추가 실패', error: e }, { status: 400 })
  }
}

export async function PATCH(req: NextRequest) {
  const token = req.cookies.get('jwt')?.value

  if (!token) {
    return NextResponse.json({ serviceCode: 403100 }, { status: 403 })
  }

  const isValidatedToken = jwt.verify(token, process.env.JWT_SECRET as string)

  if (!isValidatedToken) {
    return NextResponse.json({ serviceCode: 403101 }, { status: 403 })
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
        if (item.type === 'grid') {
          await EventNoobProHacker.pullArchitectIdByGrid(item.episode, item.image_url, beforeId)
          await EventNoobProHacker.pushArchitectIdByGrid(item.episode, item.image_url, afterId)
        } else {
          await EventNoobProHacker.pullArchitectIdByLine(item.episode, item.image_url, beforeId)
          await EventNoobProHacker.pushArchitectIdByLine(item.episode, item.image_url, afterId)
        }
      })

      await Worldcup.updateMinecraftId(beforeId, afterId)

      await Architect.updateMinecraftId(beforeId, afterId)
    }

    return NextResponse.json({ serviceCode: 201101, message: '건축가 수정 성공' }, { status: 201 })
  } catch (e) {
    return NextResponse.json(
      { serviceCode: 400102, message: '컨텐츠에서 마인크래프트 아이디 수정 실패', error: e },
      { status: 400 },
    )
  }
}
