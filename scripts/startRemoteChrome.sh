#!/bin/bash

# Starting the first line with a shebang specifies the interpreter.
# in this case, bash.
# which means this script will be executed by bash.

# Start Chrome with remote debugging and direct the window to the port passed in from the script in package.json.
# For dev mode, the port is 5555.
# For prod mode, the port is 8888.

# other flags:
# --app=localhost:$PORT // not quite correct i dont think.
# --auto-open-devtools-for-tabs \


DIR="$(dirname "$(dirname "$0")")/data/Chrome/Profiles"
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --remote-debugging-port=9222 \
  --user-data-dir="$DIR" \
  --no-first-run \
  --no-default-browser-check \
  --disable-web-security \
  --new-window \
  http://localhost:$PORT &
