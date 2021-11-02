import { GeocodingApiZip, GeocodingApiDirect } from '../open-weather-types';

export async function geocodingByZip(zip: string): Promise<GeocodingApiZip> {
  if (zip === '98133') {
    return Promise.resolve({
      data: {
        country: 'US',
        lat: 47.7377,
        lon: -122.3431,
        name: 'Seattle',
        zip: '98133',
      },
    });
  }
  return Promise.reject('Mock cannot handle input');
}

export async function geocodingByCity(
  city: string
): Promise<GeocodingApiDirect> {
  if (city === 'gfdsgdsgj') {
    return Promise.resolve({ data: [] });
  } else if (city === 'Auburn') {
    return Promise.resolve({
      data: [
        {
          name: 'Auburn',
          local_names: {
            ar: 'أوبورن',
            ascii: 'Auburn',
            en: 'Auburn',
            fa: 'اوبرن، واشینگتن',
            feature_name: 'Auburn',
            ja: 'オーバーン',
            sr: 'Оберн',
          },
          lat: 47.3073,
          lon: -122.2284,
          country: 'US',
          state: 'WA',
        },
        {
          name: 'Auburn',
          local_names: {
            ar: 'أوبورن',
            ascii: 'Auburn',
            en: 'Auburn',
            fa: 'اوبرن، واشینگتن',
            feature_name: 'Auburn',
            ja: 'オーバーン',
            sr: 'Оберн',
          },
          lat: 47.3073,
          lon: -122.2284,
          country: 'US',
          state: 'WA',
        },
        {
          name: 'Auburn',
          local_names: {
            ar: 'أوبورن',
            ascii: 'Auburn',
            fa: 'آبرن، آلاباما',
            feature_name: 'Auburn',
            ja: 'オーバーン',
            ru: 'Оберн',
            sr: 'Оберн',
          },
          lat: 32.6099,
          lon: -85.4808,
          country: 'US',
          state: 'AL',
        },
        {
          name: 'Auburn',
          local_names: {
            ar: 'أوبورن',
            ascii: 'Auburn',
            bg: 'Обърн',
            en: 'Auburn',
            fa: 'آبورن، نیویورک',
            feature_name: 'Auburn',
            ja: 'オーバーン',
            ru: 'Оберн',
            sr: 'Оберн',
          },
          lat: 42.9317,
          lon: -76.566,
          country: 'US',
          state: 'NY',
        },
        {
          name: 'Auburn',
          local_names: {
            ar: 'أوبورن',
            ascii: 'Auburn',
            bg: 'Обърн',
            fa: 'ابرن، مین',
            feature_name: 'Auburn',
            ja: 'オーバーン',
            ru: 'Оберн',
            sr: 'Оберн',
          },
          lat: 44.0979,
          lon: -70.2312,
          country: 'US',
          state: 'ME',
        },
      ],
    });
  }
  return Promise.reject('Mock cannot handle input');
}
