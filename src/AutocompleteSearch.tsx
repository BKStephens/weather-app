import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';

import { StylesObj, GeocodingMatch } from './shared-types';
import AutocompleteSearchResults from './AutocompleteSearchResults';

interface AutocompleteSearchProps {
  geocodingMatches: GeocodingMatch[];
  setGeocodingMatches: (matches: GeocodingMatch[]) => void;
  setErrorMessage: (message: string) => void;
  onSearchResultSelected: (latLon: string | null) => void;
}

function AutocompleteSearch(props: AutocompleteSearchProps) {
  const {
    geocodingMatches,
    setGeocodingMatches,
    setErrorMessage,
    onSearchResultSelected,
  } = props;
  const [searchInput, setSearchInput] = useState<string>('');
  const [displayGeocodingMatches, setDisplayGeocodingMatches] = useState(false);
  const [focusedLiKey, updateFocusedLiKey] = useState<string | null>(null);

  const showAutoSuggest = () => {
    setDisplayGeocodingMatches(geocodingMatches.length > 0);
  };

  useEffect(showAutoSuggest, [geocodingMatches]);

  const hideAutoSuggest = () => {
    setDisplayGeocodingMatches(false);
    updateFocusedLiKey(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    debounceCallback(e.target.value);
  };

  const debounceCallback = useCallback(
    debounce((searchInput) => {
      if (searchInput.length > 0) {
        axios
          .get<GeocodingMatch[]>(`/api/v1/geocoding?q=${searchInput}`)
          .then(({ data }) => {
            setErrorMessage('');
            setGeocodingMatches(
              data.map((x) => {
                x.key = `${x.lat} ${x.lon}`;
                return x;
              })
            );
          })
          .catch((error) => {
            setErrorMessage(
              'Something went wrong. Please try again in a minute or try a different search.'
            );
            setGeocodingMatches([]);
            updateFocusedLiKey(null);
          });
      } else {
        setGeocodingMatches([]);
        updateFocusedLiKey(null);
      }
    }, 300),
    []
  );

  const keys = {
    ENTER: 13,
    UP: 38,
    DOWN: 40,
  };

  const handleNavigation = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case keys.ENTER:
        setDisplayGeocodingMatches(false);
        onSearchResultSelected(focusedLiKey);
        break;
      case keys.UP:
        if (focusedLiKey) {
          const index = geocodingMatches.findIndex(
            (x) => x.key === focusedLiKey
          );
          if (index > 0) {
            updateFocusedLiKey(geocodingMatches[index - 1].key);
          }
        }
        e.preventDefault();
        break;
      case keys.DOWN:
        if (focusedLiKey) {
          const index = geocodingMatches.findIndex(
            (x) => x.key === focusedLiKey
          );
          if (index < geocodingMatches.length - 1) {
            updateFocusedLiKey(geocodingMatches[index + 1].key);
          }
        } else {
          updateFocusedLiKey(geocodingMatches[0].key);
        }

        e.preventDefault();
        break;
    }
  };

  return (
    <div style={styles.autocompleteSearch}>
      <p>
        <input
          type="text"
          placeholder="Search City or Zip"
          value={searchInput}
          style={styles.input}
          maxLength={20}
          onKeyDown={handleNavigation}
          onChange={handleInputChange}
          onFocus={showAutoSuggest}
          onBlur={hideAutoSuggest}
        />
        <AutocompleteSearchResults
          displayGeocodingMatches={displayGeocodingMatches}
          focusedLiKey={focusedLiKey}
          onSearchResultSelected={onSearchResultSelected}
          geocodingMatches={geocodingMatches}
        />
      </p>
    </div>
  );
}

const styles: StylesObj = {
  input: {
    borderRadius: '10px',
    textAlign: 'center',
    fontSize: 'inherit',
    width: '100%',
  },
  autocompleteSearchForm: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  geocodingMatchesParagraph: {
    display: 'flex',
  },
  hiddenUl: {
    overflow: 'hidden',
    height: 0,
    width: 0,
  },
};

export default AutocompleteSearch;
