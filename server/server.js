import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = 8888;


// need to do this when doing ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express());

app.use('/api/site', createProxyMiddleware({
  target: 'http://localhost:8000', // Target host
  changeOrigin: true, // needed for virtual hosted sites
  pathRewrite: {
    '^/api/site': '/', // rewrite path
  },
}));


app.use('/stylesheets', express.static(path.join(__dirname, '../client/stylesheets')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')))

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  })
}

app.use((req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});


app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));



// // Create a proxy server with custom application logic
// const proxy = httpProxy.createProxyServer({});
// const target = 'http://localhost:8000'; // User's development server URL

// // test endpoint
// app.get('/api/proxy', (req, res) => {
//   res.send('Proxy visited');
// });



// // Create a proxy server with custom application logic

// const server = http.createServer((req, res) => {
//   // Here you can modify req and res objects to inject your functionality

//   proxy.web(req, res, { target });
// });

// // Middleware to modify HTML responses
// const htmlResponseMiddleware = (req, res, next) => {
//   let originalSend = res.send;

//   res.send = function (content) {
//     if (req.headers.accept && req.headers.accept.includes('text/html')) {
//       // Modify HTML content here to inject your script
//       const injectedScript = `<script src="/path/to/your/injectedScript.js"></script>`;
//       content = content.toString().replace('</body>', `${injectedScript}</body>`);
//     }

//     originalSend.call(res, content);
//   };

//   next();
// };

// // Setup proxy middleware
// const options = {
//   target: 'http://localhost:8000', // Target host
//   changeOrigin: true, // Needed for virtual hosted sites
//   selfHandleResponse: true, // Allows us to modify the response
//   onProxyRes: htmlResponseMiddleware, // Injects the script into HTML responses
// };

// const apiProxy = createProxyMiddleware(options);
// app.use('/', apiProxy);
