import React from 'react';

import { StylesObj, GeocodingMatch } from './shared-types';

interface AutocompleteSearchResultProps {
  item: GeocodingMatch;
  focusedLiKey: string | null;
  onSearchResultSelected: (latLon: string | null) => void;
}

function AutocompleteSearchResult(props: AutocompleteSearchResultProps) {
  const { item, focusedLiKey, onSearchResultSelected } = props;

  const onMouseOver = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    // @ts-ignore
    e.target.style.background = styles.liFocused.backgroundColor;
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    // @ts-ignore
    e.target.style.background = 'white';
  };

  return (
    <li
      style={focusedLiKey === item.key ? styles.liFocused : {}}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onMouseDown={() => onSearchResultSelected(item.key)}
      key={item.key}
    >
      {item.name}
      {item.state && `, ${item.state}`}
      {`, ${item.country}`}
    </li>
  );
}

const styles: StylesObj = {
  liFocused: {
    backgroundColor: 'silver',
  },
};

export default AutocompleteSearchResult;
