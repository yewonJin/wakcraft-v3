import { NextRequest, NextResponse } from 'next/server'

import connectMongo from '@/utils/connectMongo'
import Worldcup from '@/models/worldCup'

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await connectMongo()

    const worldCup = await Worldcup.findAllByGameName('HackerWorldCup')

    return NextResponse.json(
      {
        serviceCode: 200101,
        data: worldCup,
        message: '월드컵 찾기 성공',
      },
      { status: 200 },
    )
  } catch (e) {
    return NextResponse.json({ serviceCode: 400100, message: '월드컵 찾기 실패', error: e }, { status: 400 })
  }
}

export async function PATCH(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url)

  const winner = searchParams.get('winner')

  if (!winner) {
    return NextResponse.json({ serviceCode: 400200, message: 'winner 파라미터를 입력하지 않았습니다' }, { status: 400 })
  }

  try {
    await connectMongo()

    await Worldcup.increaseNumberOfParticipation()

    await Worldcup.increaseNumberOfWin(winner)

    return NextResponse.json(
      {
        serviceCode: 201101,
        message: '월드컵 수정 성공',
      },
      { status: 201 },
    )
  } catch (e) {
    return NextResponse.json({ serviceCode: 400102, message: '월드컵 수정 실패', error: e }, { status: 400 })
  }
}
