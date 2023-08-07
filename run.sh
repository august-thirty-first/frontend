#!/bin/sh

set -x
set -e

npm install -g npm@latest && npm install
exec npm run dev
