import * as OpenWeatherAdapter from './open-weather-adapter';

function kelvinToRoundedFahrenheit(kelvinTemp: number): number {
  return Math.round((kelvinTemp - 273.15) * 1.8 + 32);
}

interface WeatherDetails {
  temp: number;
  feelsLike: number;
  dayTemp: number;
  nightTemp: number;
  weatherType: string;
  weatherIconUrl: string;
}
export async function getForecast(
  lat: number,
  lon: number
): Promise<WeatherDetails> {
  const response = await OpenWeatherAdapter.onecall(
    lat,
    lon,
    'minutely,alerts'
  );

  const {
    data: {
      current: {
        temp,
        feels_like: feelsLike,
        weather: [{ main: weatherType, icon: weatherIcon }],
      },
      daily: [
        {
          temp: { day: dayTemp, night: nightTemp },
        },
      ],
    },
  } = response;

  return Promise.resolve({
    temp: kelvinToRoundedFahrenheit(temp),
    feelsLike: kelvinToRoundedFahrenheit(feelsLike),
    dayTemp: kelvinToRoundedFahrenheit(dayTemp),
    nightTemp: kelvinToRoundedFahrenheit(nightTemp),
    weatherType,
    weatherIconUrl: `openweathermap.org/img/wn/${weatherIcon}@2x.png`,
  });
}
