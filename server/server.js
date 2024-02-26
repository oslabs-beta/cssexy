import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/stylesheets', express.static(path.join(__dirname, '../client/stylesheets')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')))

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  })
}

app.use((req, res) => res.sendStatus(404));

// global error handler to be added

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
