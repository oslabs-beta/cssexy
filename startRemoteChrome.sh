#!/bin/bash

# Start Chrome with remote debugging and direct the window to port 8888
DIR="$(dirname "$0")/CSSxe/Chrome/Profiles"
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --remote-debugging-port=9222 \
  --user-data-dir="$DIR" \
  --no-first-run \
  --no-default-browser-check \
  --auto-open-devtools-for-tabs \
  --new-window \
  http://localhost:8888 &
