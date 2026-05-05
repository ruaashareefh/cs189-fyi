#!/bin/bash
# Run once after Node.js is installed: bash setup.sh

set -e
echo "→ Installing dependencies..."
npm install

echo "→ Starting dev server at http://localhost:3000"
npm run dev
