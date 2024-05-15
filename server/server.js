import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn, exec } from 'child_process';
import { config } from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { patchFile } from '../client/features/patchFile.js';
import { callPupProcess } from '../client/puppeteer/pup.js';
import { updateEnv } from '../scripts/updateEnv.js';
import { findSourceInline } from '../client/features/findSourceInline.js';
import { findSourceRegular } from '../client/features/findSourceRegular.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __envPath = path.resolve(__dirname, '../.env')
const __scripts = path.join(__dirname, '../scripts/');

// console.log('filename:', __filename);
// console.log('dirname:', __dirname);
// console.log('path:', __envPath);
// normally we could just use config(), as that looks for the .env file in the root directory.
// but once this is an npm package installed in a given repo, the root directory
// will be that repo. so instead we use config({ path: path.resolve(__dirname, '.env') })
// to point it at cssxe's own root directory.
config({ path: __envPath });

const PORT = process.env.PORT
const environment = process.env.NODE_ENV

const browserPort = process.env.BROWSER_PORT
const targetPort = process.env.TARGET_PORT

const targetDir = process.env.TARGET_DIR ? process.env.TARGET_DIR.toString().split('\n').slice(-1)[0] : process.env.TARGET_DIR_BACKUP;

// to run CSSxe in puppeteer mode, set this to 1 in .env.
const puppeteerMode = process.env.PUPPETEER_MODE;

// updating the environment variables in the .env file
updateEnv('TARGET_DIR', targetDir);
updateEnv('BROWSER_PORT', browserPort);

const app = express();
app.use(express());
app.use(express.json());

if (environment === 'production') {
  // Serve static files (CSSxe UI) when in prod mode
  app.use(express.static(path.join(__dirname, '../dist')));
}
!browserPort ? console.log('server: error: BROWSER_PORT is not set') && process.exit(1) : null;
!targetPort ? console.log('server: error: TARGET_PORT is not set') && process.exit(1) : null;
!targetDir ? console.log('server: error: TARGET_DIR is not set') && process.exit(1) : null;

// `spawn` from the `child_process` module in Node.js is used to create new child processes.
// These run independently, but can communicate with the parent process via IPC (Inter-Process Communication) channels.
// So in this case, puppeteer is a child process of this server process.

spawn('node', ['../client/puppeteer/pup.js', browserPort]);

app.post('/cdp', async (req, res) => {
  console.log('server: post /cdp, req.body', req.body);

  try {
    // if puppeteerMode is set to true, then call the puppeteer process, otherwise call the cdp process
    const result = await callPupProcess(req.body);
    // console.log('\n\n');
    // console.log('server: cdp: result', result);
    // console.log('\n\n');

    return res.json(result);
  } catch (error) {
    console.error('Error processing data:', error);
    return res.status(500).json({ error: 'Failed to process data' });
  }
});



app.post('/findSource', async (req, res) => {
  // console.log('server: post /findSource', req.body.inlineRules.cssProperties);
  try {
    const result = req.body.inlineRules ? await findSourceInline(req.body) : await findSourceRegular(req.body);
    // console.log('server: findSource: result', result);
    return res.json(result);
  } catch (error) {
    console.error('Error processing data:', error);
    return res.status(500).json({ error: 'Failed to find inline data' });
  }
});

app.post('/openSourceFile', async (req, res) => {
  // console.log('\n\n');
  // console.log('server: get /openSourceFile');
  const { path, line } = req.body;

  console.log('server: path', path);
  try {
    // console.log('server: openSourceFile: path', path);
    // console.log('server: openSourceFile: line', line);
    exec(`code -r -g ${path}:${line}`);
    return res.send({ success: 'File opened in VS Code' });
  } catch (error) {
    console.error('Sever: Error opening path:', error);
    return res.status(500).json({ error: 'Server:Failed to open path' });
  }
});

app.post('/patch', async (req, res) => {
  console.log('server: post /patch, req.body', req.body);

  try {
    const result = await patchFile(req.body);
    console.log('server: patch: result', result);
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
  // console.log(`Server: environment ${environment}`),
  console.log(`Server: listening on port ${PORT}`),
  console.log(`Server: serving targetPort ${targetPort} on browserPort ${browserPort}`),
);
