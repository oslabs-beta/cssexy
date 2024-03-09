import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cdpProcess from '../client/features/CDP/cdp0process.js';


const app = express();
const PORT = 8888;


// need to do this when doing ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON request bodies
app.use(express.json());

console.log('Current environment:', process.env.NODE_ENV);

app.use(express());

if (process.env.NODE_ENV === 'production') {
  // Serve static files (CSSxe UI)
  app.use(express.static(path.join(__dirname, '../dist')));

  // app.get('/', (req, res) => {
  //   res.sendFile(path.join(__dirname, '../dist/index.html'));
  // })
}


app.post('/cdp', async (req, res) => {
  console.log('POST /cdp');
  console.log(req.body);
  const data = req.body;

  try {
    console.log('trying to connect to CDP');
    const result = await cdpProcess(data);
    return res.json({ result });
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
