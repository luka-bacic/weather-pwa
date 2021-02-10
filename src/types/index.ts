export interface UvInfo {
  value: number;
  description: string;
  longDescription: string;
  cssClass: string;
}

export interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface DailyResponse {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: {
    morn: number;
    day: number;
    eve: number;
    night: number;
    min: number;
    max: number;
  };
  feels_like: {
    morn: number;
    day: number;
    eve: number;
    night: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_gust: number;
  wind_deg: number;
  clouds: number;
  uvi: number;
  pop: number;
  rain: number;
  snow: number;
  weather: Weather[];
}
