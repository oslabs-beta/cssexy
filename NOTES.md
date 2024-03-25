# COMMIT, PR, ETC. NOTES

Commit notes:
  keith_puppeteer_2024-03-25:
    To run CSSxe in puppeteer mode:
      - in .env, set VITE_PUPPETEER_MODE to true.
      - run dev-pup or prod-pup, respectively (rather than dev or prod).

    To change the target port:
      - in .env, change VITE_PROXY to the desired port.

    To change the target directory path (i.e. the path to backtrack on my computer vs yours):
      - in .env, change VITE_TARGET_DIR_PATH to the desired path.
      - (This is temporary, until CSSxe is a npm package installed in the root of the target repo.)
