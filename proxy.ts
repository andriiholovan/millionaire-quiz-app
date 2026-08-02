import { decodeCookieValue, SESSION_COOKIE } from '@lib/server'
import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  // Use the parsed pathname so query strings / trailing slashes don't corrupt
  // the extracted step (e.g. `/quiz/3?x=1` -> `3`, not `3?x=1`).
  const stepFromUrl = request.nextUrl.pathname.split('/').at(-1)

  if (stepFromUrl === '1') {
    return NextResponse.next()
  }

  const raw = request.cookies.get(SESSION_COOKIE)?.value
  const decoded = raw ? decodeCookieValue(raw) : null

  if (!decoded) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // The cookie embeds the current authoritative step so the proxy can enforce
  // sequential navigation without a DB round-trip at the Edge.
  if (stepFromUrl !== String(decoded.step)) {
    return NextResponse.redirect(new URL(`/quiz/${decoded.step}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/quiz/:path*',
}
