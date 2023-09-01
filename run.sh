#!/bin/sh

set -x
set -e

npm install -g npm@latest
npm install
npm run build
exec npm run dev
