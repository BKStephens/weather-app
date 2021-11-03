import express, { Request, Response } from 'express';
import path from 'path';

import * as Geocoding from './geocoding';
import * as Weather from './weather';

interface GeocodingParams {
  q?: string;
}

interface WeatherParams {
  lat?: number;
  lon?: number;
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
      try {
        const data = await Geocoding.search(q);
        res.send(data);
        return;
      } catch (e) {
        console.error(e);
        res.status(500).send('Internal server error');
        return;
      }
    }
  );

  app.get(
    '/api/v1/weather',
    async (req: Request<{}, {}, {}, WeatherParams>, res: Response) => {
      const { lat, lon } = req.query;
      if (!lat || !lon) {
        res.status(400).send({
          error:
            'lat and lon query string parameters must be included in request',
        });
        return;
      }
      try {
        const data = await Weather.getForecast(lat, lon);
        res.send(data);
        return;
      } catch (e) {
        console.error(e);
        res.status(500).send('Internal server error');
        return;
      }
    }
  );

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });

  return app;
}

export default createServer;
