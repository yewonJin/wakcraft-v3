import { NextRequest, NextResponse } from 'next/server'

import connectMongo from '@/utils/connectMongo'
import Schedule from '@/models/schedule'

export async function GET(req: NextRequest) {
  try {
    connectMongo()

    const schedules = await Schedule.findAllWithoutAfterContent()

    return NextResponse.json(
      {
        serviceCode: 200101,
        data: schedules,
        message: '이미 등록된 스케쥴을 제외한 모든 스케쥴 찾기 완료',
      },
      { status: 200 },
    )
  } catch (e) {
    return NextResponse.json({ serviceCode: 400100, message: '스케쥴 찾기 실패', error: e }, { status: 400 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    connectMongo()

    await Schedule.create(body)

    return NextResponse.json({ serviceCode: 201100, message: '스케쥴 추가 성공' }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ serviceCode: 400101, message: '스케쥴 추가 실패', error: e }, { status: 400 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()

    connectMongo()

    await Schedule.findOneAndUpdate({ date: body.date }, { $set: body })

    return NextResponse.json({ serviceCode: 201101, message: '스케쥴 수정 성공' }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ serviceCode: 400102, message: '스케쥴 수정 실패', error: e }, { status: 400 })
  }
}
