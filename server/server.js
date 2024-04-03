import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import {spawn} from 'child_process';

import dotenv from 'dotenv';

import cdpProcess from '../client/cdp/cdp0process.js';
import { patchFile } from '../client/patchFile.js';

import { callPupProcess } from '../client/puppeteer/pup.js';

// need to do this when doing ES modules, when using Vite.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// to run CSSxe in puppeteer mode, set this to 1 in .env, and then run dev-pup or prod-pup respectively (rather than dev or prod). As of 2024-03-25_12-51-PM.
const puppeteerMode = process.env.VITE_PUPPETEER_MODE;

const environment = process.env.NODE_ENV || 'development';
const browserPort = process.env.BROWSER_PORT;

if (!browserPort) {
  console.log('server: error: BROWSER_PORT is not set');
  process.exit(1);
}

const targetPort = process.env.TARGET_PORT

// console.log('server: targetPort:', targetPort);

const targetDir = process.env.TARGET_DIR ? process.env.TARGET_DIR.toString().split('\n').slice(-1)[0] : null;

if (!targetDir) {
  console.log('server: error: TARGET_DIR is not set');
  process.exit(1);
}

const PORT = 8888;
const app = express();
app.use(express());
app.use(express.json());

// Start the Puppeteer process
const pupStart = spawn('node', ['../client/puppeteer/pup.js', browserPort])

if (environment === 'production') {
  // Serve static files (CSSxe UI) when in prod mode
  app.use(express.static(path.join(__dirname, '../dist')));
}

app.post('/cdp', async (req, res) => {
  const data = req.body;

  try {
    // if puppeteerMode is set to true, then call the puppeteer process, otherwise call the cdp process
    const result = puppeteerMode == 0 ? await cdpProcess(data) : await callPupProcess(data);

    return res.json(result);
  } catch (error) {
    console.error('Error processing data:', error);
    return res.status(500).json({ error: 'Failed to process data' });
  }
});

app.post('/patch', async (req, res) => {
  const data = req.body;

  try {
    const result = await patchFile(data, targetDir);
    return res.json(result);
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
  console.log(`Server: environment ${environment}`),
  console.log(`Server: listening on port ${PORT}`),
  console.log(`Server: serving targetPort ${targetPort} on browserPort ${browserPort}`),
);
