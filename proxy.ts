import { NextRequest, NextResponse } from 'next/server';
import { STEP } from '@/app/_lib/cookies';

export function proxy(request: NextRequest) {
  const stepFromCookie = request.cookies.get(STEP)?.value;
  const stepFromUrl = request.url.split('/').at(-1);

  if (stepFromUrl === '1') {
    return NextResponse.next();
  }
  if (!stepFromCookie) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (stepFromUrl !== stepFromCookie) {
    return NextResponse.redirect(new URL(`/quiz/${stepFromCookie}`, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/quiz/:path*',
};
