import * as OpenWeatherAdapter from './open-weather-adapter';
import { GeocodingResponse } from './geocoding-types';

export async function search(q: string): Promise<GeocodingResponse[]> {
  const isZip = !!q.match(/^[0-9]{5,}/);
  if (isZip) {
    const response = await OpenWeatherAdapter.geocodingByZip(q);
    return [
      {
        lat: response.data.lat,
        lon: response.data.lon,
        name: response.data.name,
        country: response.data.country,
        zip: response.data.zip,
      },
    ];
  } else {
    const response = await OpenWeatherAdapter.geocodingByCity(q);
    return response.data.reduce(
      (accum: GeocodingResponse[], x: GeocodingResponse) => {
        const objInArray = accum.find((y) => {
          return (Object.keys(y) as Array<keyof typeof y>).every(
            (key) => y[key] === x[key]
          );
        });
        if (!objInArray) {
          accum = accum.concat({
            state: x.state,
            lat: x.lat,
            lon: x.lon,
            name: x.name,
            country: x.country,
            zip: x.zip,
          });
        }

        return accum;
      },
      []
    );
  }
}
