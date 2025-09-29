import { NextResponse, type NextRequest } from 'next/server'

const CANON = process.env.NEXT_PUBLIC_CANON || 'vip.tdstudiosny.com'

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || ''
  const url  = req.nextUrl
  const isLocal = host.startsWith('localhost') || host.startsWith('127.') || host.endsWith('.local')
  const isVercelPreview = host.endsWith('.vercel.app')
  const isCanon = host === CANON
  const isProd = process.env.NODE_ENV === 'production'

  // Always allow local & vercel preview/branch deployments
  if (isLocal || isVercelPreview) return NextResponse.next()

  // Health/version & assets should never be redirected
  const p = url.pathname
  if (
    p.startsWith('/api/health') ||
    p.startsWith('/api/version') ||
    p.startsWith('/api/mock') ||
    p.startsWith('/api/inbound') ||
    p.startsWith('/_next') ||
    p.startsWith('/favicon') ||
    p.startsWith('/robots.txt') ||
    p.startsWith('/sitemap') ||
    /\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|map)$/i.test(p)
  ) {
    return NextResponse.next()
  }

  // Only enforce canonical host in production
  if (isProd && !isCanon) {
    const redirectURL = new URL(url.toString())
    redirectURL.host = CANON
    redirectURL.protocol = 'https:'
    return NextResponse.redirect(redirectURL, 308)
  }

  return NextResponse.next()
}

// Keep middleware active site-wide
export const config = {
  matcher: ['/((?!api\/_next).*)'],
}
