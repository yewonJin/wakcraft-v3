import { NextRequest, NextResponse } from 'next/server'

import connectMongo from '@/utils/connectMongo'
import Schedule from '@/models/schedule'

export async function GET(req: NextRequest) {
  try {
    connectMongo()

    const schedules = await Schedule.findAllWithoutAfterContent()

    return NextResponse.json(schedules, { status: 200 })
  } catch (e) {
    return NextResponse.json('스케쥴 가져오기 실패', { status: 400 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    connectMongo()

    await Schedule.create(body)

    return NextResponse.json('스케쥴 추가 성공', { status: 200 })
  } catch (e) {
    return NextResponse.json('스케쥴 추가 실패', { status: 400 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()

    connectMongo()

    await Schedule.findOneAndUpdate({ date: body.date }, { $set: body })

    return NextResponse.json('스케쥴 수정 성공', { status: 200 })
  } catch (e) {
    return NextResponse.json('스케쥴 수정 실패', { status: 400 })
  }
}
