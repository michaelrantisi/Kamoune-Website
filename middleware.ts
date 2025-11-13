import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Redirect only the root path to /fr
  if (pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = '/fr';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

// Only run on the root
export const config = { matcher: ['/'] };
