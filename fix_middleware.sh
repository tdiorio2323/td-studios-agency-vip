#!/bin/bash
# === TD Studios — Fix 401 on previews: safe canonical middleware (one shot) ===
set -euo pipefail
say(){ printf "\n\033[1;36m▸ %s\033[0m\n" "$*"; }; ok(){ printf "\033[1;32m✓ %s\033[0m\n" "$*"; }; warn(){ printf "\033[1;33m⚠ %s\033[0m\n" "$*"; }

# 0) App root
for d in "$PWD" "$PWD/.." "$HOME/code/td-agency-mvp/dashboard"; do
  [ -f "$d/package.json" ] && APP="$d" && break || true
done
[ -n "${APP:-}" ] || { echo "Run from your Next.js app root."; exit 1; }
cd "$APP"; say "Using app root: $APP"

# 1) Write safer middleware (prod-only canonical; allow localhost & *.vercel.app)
cat > middleware.ts <<'TS'
import { NextResponse, type NextRequest } from 'next/server'

const CANON = process.env.NEXT_PUBLIC_CANON || 'vip.tdstudiosny.co'

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
TS
ok "middleware.ts updated (preview-safe canonical redirect)"

# 2) Set canonical host via env (Vercel/GitHub will read this at build/runtime)
grep -q '^NEXT_PUBLIC_CANON=' .env.production 2>/dev/null || echo "NEXT_PUBLIC_CANON=vip.tdstudiosny.co" >> .env.production || true
ok "NEXT_PUBLIC_CANON set in .env.production"

# 3) Commit & push (triggers CI → Vercel)
git add middleware.ts .env.production || true
git commit -m "fix(middleware): allow *.vercel.app + localhost; prod-only canonical redirect to vip.tdstudiosny.co" || true
git push origin main || true
ok "Pushed fix to GitHub"

# 4) Optional: kick a manual prod deploy too (harmless if CI already running)
if command -v vercel >/dev/null 2>&1; then
  say "Triggering Vercel prod deploy (optional)…"
  vercel --prod --yes >/dev/null 2>&1 || warn "Vercel CLI deploy skipped"
fi

# 5) Check latest deployment URL
say "Recent deployments:"
npx vercel ls | head -3 || true
echo
say "When SSL finishes for vip.tdstudiosny.co, previews will remain 200, prod will 308 -> canonical."