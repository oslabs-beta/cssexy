import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { getBrowser } from '../client/puppeteer/pup.js';
import axios from 'axios';
const app = express();
const PORT = 5555;

// need to do this when doing ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express());
app.use(express.json())
// right now hardcoded to 8000, but should be whatever port the user's target repo is served to.
// app.get('/api/site', (req, res) => {
//   res.redirect('http://localhost:8000');
// });

app.use('/api/site', createProxyMiddleware({
  target: 'http://localhost:8000', // Target host
  changeOrigin: true, // needed for virtual hosted sites
  pathRewrite: {
    '^/api/site': '/', // rewrite path
  },
}));

// test endpoint
app.get('/api/proxy', (req, res) => {
  res.send('Proxy visited');
});

app.use('/cdp', async (req, res)=>{
  console.log(req.body)
  const {selector} = req.body
  
  const result = await getBrowser(selector)
  return res.json({result:result})
} )
let htmlData = null;
let cssData = null;
let jsData = null;
async function fetchFiles(url) {
  try {
      const htmlResponse = await fetch(`${url}/index.html`);
      htmlData = await htmlResponse.text();

      const cssResponse = await fetch(`${url}/styles.css`);
      cssData = await cssResponse.text();

      const jsResponse = await fetch(`${url}/bundle.js`);
      jsData = await jsResponse.text();
  } catch (error) {
      console.error('Error fetching files:', error);
  }
}

app.use('/frame', async (req, res)=>{
const url = req.query.url;
const response = await fetchFiles(url)

if (htmlData && cssData && jsData) {
  res.send({ html: htmlData, css: cssData, js: jsData });
} else {
  res.status(500).send('Files not available yet');
}
})

app.use('/stylesheets', express.static(path.join(__dirname, '../client/stylesheets')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')))

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  })
}

app.use((req, res) => res.sendStatus(404));

// global error handler to be added

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
