#!/usr/bin/env bash
# Tag and release sdcBillook using billook/backend package.json versions.
# CI mirror: .github/workflows/release.yml (runs on main when package.json changes).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

usage() {
  cat <<'EOF'
Usage:
  scripts/release.sh version
  scripts/release.sh bump {patch|minor|major}
  scripts/release.sh tag [--push]
  scripts/release.sh publish {patch|minor|major}

Commands:
  version   Print the synced billook/backend version and latest git tag.
  bump      Bump version in billook/ and backend/ (no commit).
  tag       Create annotated tag v<version> from package.json.
  publish   Bump, commit, push main; Release workflow tags and creates the GitHub release.

Examples:
  scripts/release.sh publish patch
  scripts/release.sh tag --push
EOF
}

read_version() {
  node -p "require('./billook/package.json').version"
}

read_backend_version() {
  node -p "require('./backend/package.json').version"
}

ensure_versions_match() {
  local version backend_version
  version="$(read_version)"
  backend_version="$(read_backend_version)"
  if [[ "$version" != "$backend_version" ]]; then
    echo "Version mismatch: billook=${version} backend=${backend_version}" >&2
    exit 1
  fi
  printf '%s' "$version"
}

cmd_version() {
  local version tag
  version="$(ensure_versions_match)"
  tag="$(git tag --merged HEAD --sort=-version:refname | head -n1 || true)"
  echo "package.json version: ${version}"
  if [[ -n "$tag" ]]; then
    echo "latest tag on branch:   ${tag}"
    echo "commits since tag:      $(git rev-list --count "${tag}"..HEAD)"
  else
    echo "latest tag on branch:   (none)"
  fi
}

cmd_bump() {
  local level="${1:?bump level required (patch|minor|major)}"
  for dir in billook backend; do
    (cd "$dir" && pnpm version "$level" --no-git-tag-version)
  done
  echo "Bumped to $(ensure_versions_match)"
}

cmd_tag() {
  local push=false version tag_name
  if [[ "${1:-}" == "--push" ]]; then
    push=true
  fi

  version="$(ensure_versions_match)"
  tag_name="v${version}"

  if git rev-parse "$tag_name" >/dev/null 2>&1; then
    echo "Tag ${tag_name} already exists" >&2
    exit 1
  fi

  git tag -a "$tag_name" -m "Release ${version}"
  echo "Created tag ${tag_name}"

  if [[ "$push" == true ]]; then
    git push origin "$tag_name"
    echo "Pushed ${tag_name}"
  fi
}

cmd_publish() {
  local level="${1:?publish level required (patch|minor|major)}"
  local version tag_name count

  if ! git diff --quiet || ! git diff --cached --quiet; then
    echo "Working tree is not clean; commit or stash changes first." >&2
    exit 1
  fi

  cmd_bump "$level"
  version="$(ensure_versions_match)"
  tag_name="v${version}"

  git add billook/package.json backend/package.json
  git commit -m "chore: bump version to ${version}"

  if git rev-parse "$tag_name" >/dev/null 2>&1; then
    echo "Tag ${tag_name} already exists" >&2
    exit 1
  fi

  if tag="$(git tag --merged HEAD --sort=-version:refname | head -n1 || true)" && [[ -n "$tag" ]]; then
    count="$(git rev-list --count "${tag}"..HEAD)"
    if [[ "$count" -eq 0 ]]; then
      echo "No commits after ${tag}; nothing to release." >&2
      exit 1
    fi
  fi

  git push origin HEAD:main
  echo "Pushed version bump to main."
  echo "Release workflow will tag ${tag_name} and create the GitHub release."
}

main() {
  local cmd="${1:-}"
  shift || true

  case "$cmd" in
    version) cmd_version ;;
    bump) cmd_bump "${1:?bump level required (patch|minor|major)}" ;;
    tag) cmd_tag "${1:-}" ;;
    publish) cmd_publish "${1:?publish level required (patch|minor|major)}" ;;
    -h|--help|help|"") usage ;;
    *)
      echo "Unknown command: ${cmd}" >&2
      usage >&2
      exit 1
      ;;
  esac
}

main "$@"
