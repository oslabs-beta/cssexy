#!/bin/bash

# Starting the first line with a shebang specifies the interpreter.
# in this case, bash.
# which means this script will be executed by bash.

# Start Chrome with remote debugging and direct the window to port 8000
DIR="$(dirname "$(dirname "$0")")/data/Chrome/Profiles"
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --remote-debugging-port=9222 \
  --user-data-dir="$DIR" \
  --no-first-run \
  --no-default-browser-check \
  --auto-open-devtools-for-tabs \
  --disable-web-security \
  --new-window \
  http://localhost:8888 &
