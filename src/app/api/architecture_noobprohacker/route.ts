import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

import Architect from '@/models/architect'
import connectMongo from '@/utils/connectMongo'
import { convertToNoobProHackerPortfolio } from '@/utils/noobprohacker'
import { NoobProHacker as TNoobProHacker } from '@/types/content'
import ArchitectureNoobProHacker from '@/models/architectureNoobProHacker'

export async function POST(req: NextRequest) {
  const token = req.cookies.get('jwt')?.value

  if (!token) {
    return NextResponse.json('토큰이 없습니다', { status: 400 })
  }

  const isValidatedToken = jwt.verify(token, process.env.JWT_SECRET as string)

  if (!isValidatedToken) {
    return NextResponse.json('토큰이 유효하지 않습니다.', { status: 400 })
  }

  const body: TNoobProHacker = await req.json()

  connectMongo()

  try {
    await ArchitectureNoobProHacker.create(body)
  } catch (e) {
    return NextResponse.json('건축 눕프핵 추가 실패', { status: 400 })
  }

  try {
    const architects = convertToNoobProHackerPortfolio(body)

    architects.forEach(async (architect) => {
      await Architect.pushArchitectureNoobProHackerToPortfolio(architect.minecraft_id, architect.portfolio)
    })

    return NextResponse.json('성공', { status: 200 })
  } catch (e) {
    return NextResponse.json('건축가 포트폴리오에 추가 실패', { status: 400 })
  }
}
