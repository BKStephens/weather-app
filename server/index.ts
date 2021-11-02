import express from 'express';
import * as dotenv from 'dotenv';

const start = async () => {
  dotenv.config();
  const port = process.env.PORT ? parseInt(process.env.PORT) : 8000;
  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.listen(port);
};

start();
