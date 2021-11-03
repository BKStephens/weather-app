export interface GeocodingApiZip {
  data: GeocodingResponse;
}

export interface GeocodingApiDirect {
  data: GeocodingResponse[];
}

const {} = response;

interface OnecallCurrentWeather {
  main: string;
  icon: string;
}

interface OnecallDailyTemp {
  temp: {
    day: number;
    night: number;
  };
}

export interface Onecall {
  data: {
    current: {
      temp: number;
      feels_like: number;
      weather: OnecallCurrentWeather[];
    };
    daily: OnecallDailyTemp[];
  };
}
