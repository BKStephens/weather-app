import axios from 'axios';
import { GeocodingResponse } from './geocoding-types';
import { GeocodingApiZip, GeocodingApiDirect } from './open-weather-types';

export async function geocodingByZip(zip: string): Promise<GeocodingApiZip> {
  return axios.get(
    `${process.env.OPEN_WEATHER_API_URI}/geo/1.0/zip?zip=${zip}&appid=${process.env.OPEN_WEATHER_API_KEY}`
  );
}

export async function geocodingByCity(
  city: string
): Promise<GeocodingApiDirect> {
  return axios.get(
    `${process.env.OPEN_WEATHER_API_URI}/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.OPEN_WEATHER_API_KEY}`
  );
}
