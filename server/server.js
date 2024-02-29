import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createProxyMiddleware } from 'http-proxy-middleware';


const app = express();
const PORT = 5555;

// need to do this when doing ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express());

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
