// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const CANON = 'vip.tdstudiosny.co'

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || ''
  if (host !== CANON) {
    const url = new URL(req.nextUrl)
    url.host = CANON
    url.protocol = 'https:'
    return NextResponse.redirect(url, 301)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)'],
}