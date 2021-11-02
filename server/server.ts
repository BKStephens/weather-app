import express, { Request, Response } from 'express';
import path from 'path';

import * as Geocoding from './geocoding';

interface GeocodingParams {
  q?: string;
}

function createServer() {
  const app = express();
  app.use(express.static(path.join(__dirname, '..', 'build')));
  app.use(express.static('public'));

  app.get(
    '/api/v1/geocoding',
    async (req: Request<{}, {}, {}, GeocodingParams>, res: Response) => {
      const q = req.query.q;
      if (!q) {
        res.status(400).send({
          error: 'q query string parameter must be included in request',
        });
        return;
      }
      const data = await Geocoding.search(q);
      res.send(data);
    }
  );

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });

  return app;
}

export default createServer;
