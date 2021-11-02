const express = require('express');

const start = async () => {
  const port = process.env.PORT ? parseInt(process.env.PORT) : 8000;
  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello World!')
  });

  app.listen(port);
}

start();
