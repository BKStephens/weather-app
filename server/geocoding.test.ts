import * as Geocoding from './geocoding';
jest.mock('./open-weather-adapter');

describe('search', () => {
  test('returns data when zip passed in', async () => {
    const data = await Geocoding.search('98133');

    expect(data).toEqual([
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
    const data = await Geocoding.search('Auburn');

    expect(data).toEqual([
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
});
