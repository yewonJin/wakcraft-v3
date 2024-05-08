import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('jwt')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    if (!isVerifyJWT(token)) {
      request.cookies.delete('jwt')
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
  }

  if (request.nextUrl.pathname.startsWith('/login')) {
    const token = request.cookies.get('jwt')?.value

    if (!token) return NextResponse.next()

    if (!isVerifyJWT(token)) {
      return NextResponse.next()
    }

    return NextResponse.redirect(new URL('/admin', request.url))
  }
}

const isVerifyJWT = async (token: string) => {
  const verified = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))

  return verified.payload ? true : false
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}
