import * as dotenv from 'dotenv';
import createServer from './server';

const start = () => {
  try {
    dotenv.config();
    const port = process.env.PORT ? parseInt(process.env.PORT) : 8000;
    const app = createServer();

    app.listen(port);
  } catch (e) {
    console.error(e);
  }
};

start();
