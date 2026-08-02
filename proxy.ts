import { STEP } from '@lib/server'
import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const stepFromCookie = request.cookies.get(STEP)?.value
  // Use the parsed pathname so query strings / trailing slashes don't corrupt
  // the extracted step (e.g. `/quiz/3?x=1` -> `3`, not `3?x=1`).
  const stepFromUrl = request.nextUrl.pathname.split('/').at(-1)

  if (stepFromUrl === '1') {
    return NextResponse.next()
  }
  if (!stepFromCookie) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  if (stepFromUrl !== stepFromCookie) {
    return NextResponse.redirect(
      new URL(`/quiz/${stepFromCookie}`, request.url),
    )
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/quiz/:path*',
}
