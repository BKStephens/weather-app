import express from 'express';
import createServer from './server';
import axios from 'axios';
import * as OpenWeatherAdapater from './open-weather-adapter';

jest.mock('./open-weather-adapter');

let app = createServer();
// @ts-ignore
let server;

beforeAll(async () => {
  server = app.listen('3777');
});

afterAll(async () => {
  // @ts-ignore
  server.close();
});

describe('GET /api/v1/geocoding', () => {
  test('returns data when zip passed in', async () => {
    const response = await axios.get(
      `http://0.0.0.0:3777/api/v1/geocoding?q=98133`
    );

    expect(response.data).toEqual([
      {
        country: 'US',
        lat: 47.7377,
        lon: -122.3431,
        name: 'Seattle',
        zip: '98133',
      },
    ]);
  });

  test('returns data when city passed in', async () => {
    const response = await axios.get(
      `http://0.0.0.0:3777/api/v1/geocoding?q=Auburn`
    );

    expect(response.data).toEqual([
      {
        state: 'WA',
        lat: 47.3073,
        lon: -122.2284,
        name: 'Auburn',
        country: 'US',
      },
      {
        state: 'AL',
        lat: 32.6099,
        lon: -85.4808,
        name: 'Auburn',
        country: 'US',
      },
      {
        state: 'NY',
        lat: 42.9317,
        lon: -76.566,
        name: 'Auburn',
        country: 'US',
      },
      {
        state: 'ME',
        lat: 44.0979,
        lon: -70.2312,
        name: 'Auburn',
        country: 'US',
      },
    ]);
  });

  test('returns empty list when random string passed in', async () => {
    const response = await axios.get(
      `http://0.0.0.0:3777/api/v1/geocoding?q=gfdsgdsgj`
    );

    expect(response.data).toEqual([]);
  });

  test('returns HTTP 400 when no q query string parameter', async () => {
    const promise = axios.get(`http://0.0.0.0:3777/api/v1/geocoding`);

    await expect(promise).rejects.toThrow(
      'Request failed with status code 400'
    );
  });
});

describe('GET /api/v1/weather', () => {
  test('returns data when lat and lon passed in', async () => {
    const response = await axios.get(
      `http://0.0.0.0:3777/api/v1/weather?lat=47.3073&lon=-122.2284`
    );

    expect(response.data).toEqual({
      dayTemp: 57,
      feelsLike: 49,
      nightTemp: 51,
      temp: 50,
      weatherType: 'Clouds',
      weatherIconUrl: 'openweathermap.org/img/wn/04n@2x.png',
    });
  });

  test('returns HTTP 400 when no lat query string parameter', async () => {
    const promise = axios.get(
      `http://0.0.0.0:3777/api/v1/weather?lon=-122.2284`
    );

    await expect(promise).rejects.toThrow(
      'Request failed with status code 400'
    );
  });

  test('returns HTTP 400 when no lon query string parameter', async () => {
    const promise = axios.get(`http://0.0.0.0:3777/api/v1/weather?lat=47.3073`);

    await expect(promise).rejects.toThrow(
      'Request failed with status code 400'
    );
  });
});
