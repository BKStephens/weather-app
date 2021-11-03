import React, { useState } from 'react';
import axios from 'axios';

import { StylesObj, GeocodingMatch, WeatherDetails } from './shared-types';
import AutocompleteSearch from './AutocompleteSearch';
import CurrentWeather from './CurrentWeather';

function App() {
  const [geocodingMatches, setGeocodingMatches] = useState<GeocodingMatch[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [weatherDetails, setWeatherDetails] = useState<WeatherDetails | null>();

  const onSearchResultSelected = (latLon: string | null) => {
    const { lat, lon } = geocodingMatches.find(
      (x) => x.key === latLon
    ) as GeocodingMatch;
    axios
      .get<WeatherDetails>(`/api/v1/weather?lat=${lat}&lon=${lon}`)
      .then(({ data }) => {
        setErrorMessage('');
        setWeatherDetails(data);
      })
      .catch((error) => {
        setErrorMessage(
          'Something went wrong. Please try again in a minute or try a different search.'
        );
      });
  };

  return (
    <div style={styles.page}>
      <AutocompleteSearch
        onSearchResultSelected={onSearchResultSelected}
        geocodingMatches={geocodingMatches}
        setGeocodingMatches={setGeocodingMatches}
        setErrorMessage={setErrorMessage}
      />
      {errorMessage.length > 0 && <p style={styles.error}>{errorMessage}</p>}
      {weatherDetails && <CurrentWeather weatherDetails={weatherDetails} />}
    </div>
  );
}

const styles: StylesObj = {
  page: {
    backgroundColor: '#1a357c',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '40px',
    fontSize: 'min(calc(10px + 2vmin), 24px)',
    color: '#fff',
  },
  error: {
    color: 'red',
    fontSize: '18px',
  },
};

export default App;
