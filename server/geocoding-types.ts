export interface GeocodingResponse {
  state?: string;
  lat: number;
  lon: number;
  zip: number;
  name: string;
  country: string;
}
