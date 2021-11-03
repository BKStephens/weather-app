import React from 'react';

import { StylesObj, WeatherDetails } from './shared-types';

interface CurrentWeatherProps {
  weatherDetails: WeatherDetails;
}

function CurrentWeather(props: CurrentWeatherProps) {
  const {
    weatherDetails: {
      temp,
      weatherType,
      weatherIconUrl,
      feelsLike,
      dayTemp,
      nightTemp,
    },
  } = props;

  return (
    <div style={styles.currentWeather}>
      <div>
        <p style={styles.currentTemp}>{temp}&deg;</p>
        <p style={styles.weatherType}>{weatherType}</p>
        <p style={styles.feelsLike}>Feels like {feelsLike}&deg;</p>
        <p style={styles.dayNight}>
          Day {dayTemp}&deg; - Night {nightTemp}&deg;
        </p>
      </div>
      <img
        alt={weatherType}
        src={`//${weatherIconUrl}`}
        width="100"
        height="100"
      />
    </div>
  );
}

const styles: StylesObj = {
  currentWeather: {
    display: 'flex',
    alignItems: 'center',
  },
  currentTemp: {
    fontSize: '40px',
    margin: '0 0 20px 0',
  },
  weatherType: {
    margin: 0,
    fontSize: '20px',
  },
  feelsLike: {
    margin: 0,
    fontSize: '20px',
  },
  dayNight: {
    margin: '10px 0 0 0',
    fontSize: '20px',
  },
};

export default CurrentWeather;
