import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';

import cdpProcess from '../client/cdp/cdp0process.js';
import { patchFile } from '../client/patchFile.js';

import { pup, callPupProcess } from '../client/puppeteer/pup.js';


// console.log('server: targetDir:', targetDir);

// need to do this when doing ES modules, when using Vite.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });


// to run CSSxe in puppeteer mode, set this to 1 in .env, and then run dev-pup or prod-pup respectively (rather than dev or prod). As of 2024-03-25_12-51-PM.
const puppeteerMode = process.env.VITE_PUPPETEER_MODE;

const environment = process.env.NODE_ENV || 'development';
const browserPort = process.env.NODE_BROWSER_PORT;
const targetDir = process.env.NODE_TARGET_DIR ? process.env.NODE_TARGET_DIR.toString().split('\n').slice(-1)[0] : process.env.NODE_TARGET_DIR_PATH_BACKUP

console.log('server targetDir:', targetDir);

// console.log('puppeteerMode:', puppeteerMode);

// Middleware to parse JSON request bodies

const app = express();
const PORT = 8888;

app.use(express.json());

app.use(express());

if (environment === 'production') {
  // Serve static files (CSSxe UI) when in prod mode
  app.use(express.static(path.join(__dirname, '../dist')));
}

app.post('/cdp', async (req, res) => {
  // console.log('POST /cdp');
  // console.log(req.body);
  const data = req.body;

  try {
    // console.log('server: /cdp: cdpProcess about to start');
    // if puppeteerMode is set to true, then call the puppeteer process, otherwise call the cdp process
    const result = puppeteerMode == 0 ? await cdpProcess(data) : await callPupProcess(data);

    // console.log('server: /cdp: result should be returning now');
    // console.log('server: cdp: result:', result);
    return res.json( result );
  } catch (error) {
    console.error('Error processing data:', error);
    return res.status(500).json({ error: 'Failed to process data' });
  }
});

app.post('/patch', async (req, res) => {
  // console.log('POST /write');
  // console.log(req.body);
  const data = req.body;

  try {
    // console.log('server: /patch: writeFile about to start');
    console.log('\n\n');
    console.log('server: /patch: targetDir:', targetDir);
    const result = await patchFile(data, targetDir);
    // console.log('server: /patch: result should be returning now');
    // console.log('server: /patch: result:', result);
    return res.json( result );
  } catch (error) {
    console.error('Error processing data:', error);
    return res.status(500).json({ error: 'Failed to patch data' });
  }
});

app.use((req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});

app.listen(PORT, () =>
  console.log('\n'),
  console.log('\n'),
  console.log('Server: environment:', environment),
  console.log(`Server: listening on port: ${PORT}`),
  // if puppeteerMode is set to true, then call pup, which is the Puppeteer equivalent of the prior startRemoteChrome script.
  // findJsxFiles(),
  puppeteerMode == 0 ? null : pup(browserPort).catch(console.error)

);
