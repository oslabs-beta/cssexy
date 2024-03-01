#!/bin/bash

# Start Chrome with remote debugging
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --remote-debugging-port=9222 \
  --user-data-dir=$(mktemp -d -t 'chrome-remote_data_dir') \
  --auto-open-devtools-for-tabs &

# Wait for Chrome to start and open the first tab
sleep 3

# Run the Node.js script to enable CSS
node cdp0process.js
