export interface GeocodingMatch {
  key: string;
  state?: string;
  lat: number;
  lon: number;
  zip: number;
  name: string;
  country: string;
}

export interface StylesObj {
  [key: string]: React.CSSProperties;
}

export interface WeatherDetails {
  temp: number;
  feelsLike: number;
  dayTemp: number;
  nightTemp: number;
  weatherType: string;
  weatherIconUrl: string;
}
