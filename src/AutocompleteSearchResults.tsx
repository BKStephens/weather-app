import React from 'react';

import { StylesObj, GeocodingMatch } from './shared-types';
import AutocompleteSearchResult from './AutocompleteSearchResult';

interface AutocompleteSearchResultsProps {
  displayGeocodingMatches: boolean;
  focusedLiKey: string | null;
  onSearchResultSelected: (latLon: string | null) => void;
  geocodingMatches: GeocodingMatch[];
}

function AutocompleteSearchResults(props: AutocompleteSearchResultsProps) {
  const {
    displayGeocodingMatches,
    focusedLiKey,
    onSearchResultSelected,
    geocodingMatches,
  } = props;
  if (!displayGeocodingMatches) {
    return null;
  }

  return (
    <ul style={styles.geocodingMatchesList}>
      {geocodingMatches.map((match) => (
        <AutocompleteSearchResult
          item={match}
          focusedLiKey={focusedLiKey}
          onSearchResultSelected={onSearchResultSelected}
        />
      ))}
    </ul>
  );
}

const styles: StylesObj = {
  geocodingMatchesList: {
    border: 'black',
    backgroundColor: 'white',
    color: 'black',
    listStyleType: 'none',
    textAlign: 'left',
    padding: '5px',
    marginTop: 0,
    marginRight: '-8px',
    cursor: 'pointer',
  },
};

export default AutocompleteSearchResults;
