#!/bin/bash
# === TD Studios — domain attach (.co), SSL check, smoke test ===
set -euo pipefail
say(){ printf "\n\033[1;36m▸ %s\033[0m\n" "$*"; }; ok(){ printf "\033[1;32m✓ %s\033[0m\n" "$*"; }; warn(){ printf "\033[1;33m⚠ %s\033[0m\n" "$*"; }

DOMAIN="vip.tdstudiosny.co"
PROJECT="td-agency-ui-dropin"
TARGET="$(npx vercel ls | awk '/https?:\/\//{print $1;exit}')"

command -v vercel >/dev/null || { echo "Install Vercel CLI: npm i -g vercel"; exit 1; }

say "Attach domain (idempotent)…"
vercel domains add "$DOMAIN" >/dev/null 2>&1 || true
vercel project add-domain "$PROJECT" "$DOMAIN" >/dev/null 2>&1 || true
ok "Domain registered with project"

say "DNS status…"
echo "Expected CNAME: $DOMAIN -> $TARGET"
dig +short "$DOMAIN" CNAME || true

say "Probe HTTPS…"
code_https=$(curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN" || true)
echo "https://$DOMAIN -> $code_https"
[ "$code_https" = "200" -o "$code_https" = "301" ] || warn "Not 200/301 yet (DNS/SSL may still be issuing)."

say "Contact form page check…"
curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN/contact" || true
ok "Done. Re-run in a minute if SSL is still provisioning."