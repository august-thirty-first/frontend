#!/bin/sh

set -x
set -e

npm install
exec npm run dev
