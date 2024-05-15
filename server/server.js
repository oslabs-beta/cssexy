// Import Vite Middleware
import {createServer} from 'vite';
import {router} from './getMainApplication.js';
import { cdpRouter } from './cdp.js';
import path from 'path';
// import express from 'express';
import express from 'express';
const PORT = 6969;
const app = express();

app.use(express.json());

  // Create Vite server in middleware mode
  const vite = await createServer({
    server: { middlewareMode: true},
    appType: 'spa', // don't include Vite's default HTML handling middlewares
    configFile: path.resolve(import.meta.dirname,'../vite.config.js')
  })
  
  // Use vite's connect instance as middleware
  app.use('/app', vite.middlewares)
  app.use('/cdp',cdpRouter)
  app.use('/', router)

/** 404 and errors */
app.use((req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});


/*** Serve Application on Port 6969 */
app.listen(PORT, () =>
  console.log('\n'),
  console.log('\n'),
  // console.log(`Server: environment ${environment}`),
  console.log(`Server: listening on port ${PORT}`),
  // console.log(`Server: serving proxy ${proxy}`),
);











/******** Not Needed? */

// app.post('/cdp', async (req, res) => {
//   const data = req.body;

//   try {
//     // if puppeteerMode is set to true, then call the puppeteer process, otherwise call the cdp process
//     const result = puppeteerMode == 1 ? await callPupProcess(data) : await cdpProcess(data);

//     return res.json(result);
//   } catch (error) {
//     console.error('Error processing data:', error);
//     return res.status(500).json({ error: 'Failed to process data' });
//   }
// });

// app.post('/patch', async (req, res) => {
//   const data = req.body;

//   try {
//     const result = await patchFile(data, targetDir);
//     return res.json(result);
//   } catch (error) {
//     console.error('Error processing data:', error);
//     return res.status(500).json({ error: 'Failed to patch data' });
//   }
// });


// app.use('/app*')

// // Start Puppeteer if puppeteerMode is set to 1.
// if (puppeteerMode == 1) {
//   // `spawn` from the `child_process` module in Node.js is used to create new child processes.
//   // These run independently, but can communicate with the parent process via IPC (Inter-Process Communication) channels.
//   // So in this case, puppeteer is a child process of this server process.
//   spawn('node', ['../client/puppeteer/pup.js', browserPort])
// }
// // else, start the cdp process.
// else {
//   console.log('pup.js: puppeteerMode set to 0. puppeteer will not be called')
//   spawn('node', [`${__scripts}startRemoteChrome.js`]);
// }

// if (environment === 'production') {
//   // Serve static files (CSSxe UI) when in prod mode
//   app.use(express.static(path.join(__dirname, '../dist')));
// }

// import { spawn } from 'child_process';

// import { config } from 'dotenv';

// import cdpProcess from '../client/cdp/cdp0process.js';
// import { patchFile } from '../client/patchFile.js';

// import { callPupProcess } from '../client/puppeteer/pup.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const __envPath = path.resolve(__dirname, '../.env')
// const __scripts = path.join(__dirname, '../scripts/');



// console.log('filename:', __filename);
// console.log('dirname:', __dirname);
// console.log('path:', __envPath);
// normally we could just use config(), as that looks for the .env file in the root directory.
// but once this is an npm package installed in a given repo, the root directory
// will be that repo. so instead we use config({ path: path.resolve(__dirname, '.env') })
// to point it at cssxe's own root directory.
// config({ path: __envPath });

// const environment = process.env.NODE_ENV || 'development';
// const browserPort = process.env.BROWSER_PORT || process.env.BROWSER_PORT_BACKUP;
// const proxy = process.env.PROXY || process.env.PROXY_BACKUP;
// const targetDir = process.env.TARGET_DIR ? process.env.TARGET_DIR.toString().split('\n').slice(-1)[0] : process.env.TARGET_DIR_BACKUP;

// // to run CSSxe in puppeteer mode, set this to 1 in .env.
// const puppeteerMode = process.env.PUPPETEER_MODE;



// !browserPort ? console.log('server: error: BROWSER_PORT is not set') && process.exit(1) : null;
// !proxy ? console.log('server: error: PROXY is not set') && process.exit(1) : null;
// !targetDir ? console.log('server: error: TARGET_DIR is not set') && process.exit(1) : null;
