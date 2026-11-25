#!/usr/bin/env bash
set -euo pipefail
npm install
npm run build
echo
echo "Build complete. Static website output is in ./dist"
echo "For GitHub Pages, the included Actions workflow can build and deploy it automatically."
