import React, { useState } from 'react';

import { StylesObj, GeocodingMatch } from './shared-types';
import AutocompleteSearch from './AutocompleteSearch';

function App() {
  const [geocodingMatches, setGeocodingMatches] = useState<GeocodingMatch[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState('');

  const onSearchResultSelected = (latLon: string | null) => {
    console.log('######### onSearchResultSelected', latLon);
    // TODO: call server and get forecast data
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
