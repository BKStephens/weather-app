import * as Weather from './weather';
jest.mock('./open-weather-adapter');

describe('getForecast', () => {
  test('returns data when lat and lon passed in', async () => {
    const response = await Weather.getForecast(47.3073, -122.2284);

    expect(response).toEqual({
      dayTemp: 57,
      feelsLike: 49,
      nightTemp: 51,
      temp: 50,
      weatherType: 'Clouds',
      weatherIconUrl: 'openweathermap.org/img/wn/04n@2x.png',
    });
  });
});
