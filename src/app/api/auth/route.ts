import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest) {
  try {
    const { id, password } = await req.json()

    if (!id || !password) {
      return NextResponse.json({ serviceCode: 401100 }, { status: 401 })
    }

    if (id !== process.env.ADMIN_ID || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ serviceCode: 401101 }, { status: 401 })
    }

    const token = jwt.sign({ user: id }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })

    const response = NextResponse.json({ serviceCode: 200100, message: '로그인 성공' }, { status: 200 })

    response.cookies.set({
      name: 'jwt',
      value: token,
      httpOnly: true,
      maxAge: 60 * 60,
    })

    return response
  } catch (e) {
    return NextResponse.json({ serviceCode: 401102, error: e }, { status: 401 })
  }
}
