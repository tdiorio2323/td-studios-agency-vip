#!/bin/bash
# === TD Studios — Remove large files from history + push clean repo (one shot) ===
set -euo pipefail
say(){ printf "\n\033[1;36m%s\033[0m\n" "▸ $*"; }; ok(){ printf "\033[1;32m%s\033[0m\n" "✓ $*"; }; warn(){ printf "\033[1;33m%s\033[0m\n" "⚠ $*"; }

REMOTE_URL="https://github.com/tdiorio2323/td-studios-agency-vip.git"

# 0) Sanity: ensure we're in the repo root
[ -d .git ] || { echo "Run this in the project repo (where .git exists)."; exit 1; }

# 1) Make sure we won't re-commit build artifacts/deps
cat > .gitignore <<'IGN'
# Dependencies / builds
node_modules
.next
out
dist
# Local env and Vercel metadata
.env*
.vercel
# OS cruft / coverage / snapshots
.DS_Store
coverage
.snapshots
IGN
git add .gitignore || true

# 2) Remove offending directories/files from the working tree (if present)
rm -rf node_modules .next out dist || true

# 3) Ensure origin is set correctly
if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
fi
ok "Remote set: $(git remote get-url origin)"

# 4) Install git-filter-repo if not present (prefer Homebrew, then pip)
if ! command -v git-filter-repo >/dev/null 2>&1; then
  say "Installing git-filter-repo…"
  if command -v brew >/dev/null 2>&1; then
    brew install git-filter-repo >/dev/null
  else
    # Fall back to pip (user-level, no prompt)
    python3 -m pip install --user --quiet git-filter-repo || pip3 install --user --quiet git-filter-repo
    # Add to PATH for this shell if needed
    export PATH="$HOME/Library/Python/3.*/bin:$HOME/.local/bin:$PATH"
  fi
fi
command -v git-filter-repo >/dev/null 2>&1 || { echo "git-filter-repo not available"; exit 1; }
ok "git-filter-repo ready"

# 5) Commit any staged changes prior to rewrite
git add -A
git commit -m "chore: update .gitignore and remove build artifacts from working tree" || true

# 6) Rewrite history to drop heavy paths and any blobs > 90MB (e.g., swc native binaries)
say "Rewriting history to purge large files and build/deps…"
git filter-repo --force \
  --invert-paths \
  --path node_modules \
  --path .next \
  --path out \
  --path dist

# Also strip any remaining >90MB blobs (safety net)
git filter-repo --force --strip-blobs-bigger-than 90M

# 7) Clean up and repack
git for-each-ref --format="%(refname)" refs/original/ | xargs -I {} git update-ref -d {} || true
git reflog expire --expire=now --all || true
git gc --prune=now --aggressive || true
ok "History cleaned"

# 8) Push rewritten main to GitHub (force-with-lease for safety)
# Create main if not present locally
if ! git rev-parse --verify main >/dev/null 2>&1; then git checkout -b main; fi
say "Pushing clean history to GitHub…"
git push --force-with-lease origin main

ok "Push complete. GitHub repo is now free of >100MB blobs and build artifacts."

say "Post-push notes:"
cat <<'TXT'
• GitHub should accept the branch now (no GH001 errors).
• If you use GitHub Actions with Vercel, they'll run on the next push.
• Local working dir keeps node_modules/.next ignored going forward.
TXT