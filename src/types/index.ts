export interface WeatherAlert {
  description: string;
  event: string;
  sender_name: string;
  start: number;
  end: number;
}

export interface UvInfo {
  value: number;
  description: string;
  longDescription: string;
  cssClass: string;
}

export interface IconData {
  url: string;
  description: string;
}

export interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}
export interface Day {
  dayNumber: string;
  label: string;
  weather: HourlyResponse[];
}

export interface HourlyResponse {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_gust: number;
  wind_deg: number;
  pop: number;
  rain: {
    '1h': number;
  };
  snow: {
    '1h': number;
  };
  weather: Weather[];
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
