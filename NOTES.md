# COMMIT, PR, ETC. NOTES

Commit notes:
  keith_2024-03-28_npmLink:
    npm link working.
    cssxe can now be run from inside of another repo.
    To link, in the cssxe directory first run npm init, then npm link.
    Then, in the target repo directory, run npm link cssxe.
    Then add the following script to the target repo package.json:
      "sexy": "TARGET_DIR=$(pwd) npm run cssxe:dev --prefix node_modules/cssxe".
    the cssxe package doesn’t programatically obtain the port (at the moment) due to being run with npm link. so for now its set to 8000, the .env file. But if cssxe was installed as an npm package the logic for getting the port programatically would work now.


  keith_puppeteer_2024-03-25:
    To run CSSxe in puppeteer mode:
      - in .env, set VITE_PUPPETEER_MODE to true.
      - run dev-pup or prod-pup, respectively (rather than dev or prod).

    To change the target port:
      - in .env, change VITE_PROXY to the desired port.

    To change the target directory path (i.e. the path to backtrack on my computer vs yours):
      - in .env, change VITE_TARGET_DIR_PATH to the desired path.
      - (This is temporary, until CSSxe is a npm package installed in the root of the target repo.)
