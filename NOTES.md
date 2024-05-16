# COMMIT, PR, ETC. NOTES

Commit notes:

  keith_2024-04-05:
   system design / structure:
   - have the target repo already running.
   - from the target repo root directory, in a new terminal run 'npm run sexy'.
   - this passes the target directory path as TARGET_DIR to cssexy.
   - getTargetPort.js is triggered by npm run sexy, and is passed the target directory.
    -  It uses TARGET_DIR to programatically obtain the target port.
    -  It sets TARGET_PORT in the .env file.
  - cssexy's server starts.
    - the bundled cssexy files in /dist are served to PORT.
    - at the moment, either puppeteer or remoteChrome can be used to as the browser interface.
      - set PUPPETEER_MODE to 1 in the .env file to use puppeteer.
    - the browser is opened to the BROWSER_PORT (which in prod mode is the same as PORT, while in dev mode is 5555).
    - Index.jsx is the entry point for the browser.
    - it imports App.jsx
    - App.jsx imports SidebarComp and IframeComp, and returns them in a react fragment.
      - it passes the TARGET_PORT to IframeComp.
    - iframeComp sets targetUrl to 'http://localhost:TARGET_PORT', and returns an iframe with that url.
      - an event listener inside of the iframe triggers on any click.
      - it passes the event object to a handler function


  keith_2024-04-04:
    target port (e.g. 8000 for Backtrack) can be obtained programatically
    after linking cssexy in a target repo and adding the 'sexy' script described below to the package.json of the target repo.
    and running cssexy by running npm run sexy from the target repo (after running the target repo in its own node process as usual.)
  keith_2024-03-28_npmLink:
    npm link working.
    cssexy can now be run from inside of another repo.
    To link, in the cssexy directory first run npm init, then npm link.
    Then, in the target repo directory, run npm link cssexy.
    Then add the following script to the target repo package.json:
      "sexy": "TARGET_DIR=$(pwd) npm run cssexy:dev --prefix node_modules/cssexy".
    the cssexy package doesn’t programatically obtain the port (at the moment) due to being run with npm link. so for now its set to 8000, the .env file. But if cssexy was installed as an npm package the logic for getting the port programatically would work now.

  keith_puppeteer_2024-03-25:
    To run cssexy in puppeteer mode:
      - in .env, set VITE_PUPPETEER_MODE to true.
      - run dev-pup or prod-pup, respectively (rather than dev or prod).

    To change the target port:
      - in .env, change VITE_PROXY to the desired port.

    To change the target directory path (i.e. the path to backtrack on my computer vs yours):
      - in .env, change VITE_TARGET_DIR_PATH to the desired path.
      - (This is temporary, until cssexy is a npm package installed in the root of the target repo.)
