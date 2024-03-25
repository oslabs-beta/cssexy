import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';

// import cdpProcess from '../client/cdp/cdp0process.js';
import patchFile from '../client/patchFile.js';

import { pup, callPupProcess } from '../client/puppeteer/pup.js';

const app = express();
const PORT = 8888;
const environment = process.env.NODE_ENV || 'development';
const browserPort = process.env.NODE_BROWSER_PORT;

// need to do this when doing ES modules, when using Vite.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const proxy = process.env.VITE_PROXY;

// Middleware to parse JSON request bodies
app.use(express.json());

app.use(express());

if (environment === 'production') {
  // Serve static files (CSSxe UI) when in prod mode
  app.use(express.static(path.join(__dirname, '../dist')));
}



app.post('/patch', async (req, res) => {
  console.log('POST /write');
  // console.log(req.body);
  const data = req.body;

  try {
    console.log('server: /patch: writeFile about to start');
    const result = await patchFile(data);
    console.log('server: /patch: result should be returning now');
    console.log('server: /patch: result:', result);
    return res.json( result );
  } catch (error) {
    console.error('Error processing data:', error);
    return res.status(500).json({ error: 'Failed to patch data' });
  }
});

app.post('/cdp', async (req, res) => {
  console.log('POST /cdp');
  // console.log(req.body);
  const data = req.body;

  try {
    console.log('server: /cdp: cdpProcess about to start');
    // const result = await cdpProcess(data);
    const result = await callPupProcess(data);
    console.log('server: /cdp: result should be returning now');
    // console.log('server: cdp: result:', result);
    return res.json( result );
  } catch (error) {
    console.error('Error processing data:', error);
    return res.status(500).json({ error: 'Failed to process data' });
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
  console.log('Server: proxy:', proxy ),
  console.log(`Server: listening on port: ${PORT}`),
  pup(browserPort).catch(console.error)

);
