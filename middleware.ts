import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // todo fix that
  // in case the gamer tries to cheat and navigates to different quiz question
  const current = request.headers.get('referer')?.split('/').at(-1) ?? 0;
  const next = request.nextUrl.pathname?.split('/').at(-1) ?? 0;
  if (current < next) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/quiz/:path'],
};
