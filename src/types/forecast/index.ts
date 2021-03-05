// Based on https://openweathermap.org/api/one-call-api#parameter

// Weather alerts structure
export interface AlertResponse {
  description: string;
  event: string;
  sender_name: string;
  start: number;
  end: number;
}

// Current weather structure
export interface CurrentResponse {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  clouds: number;
  uvi: number;
  visibility: number;
  wind_speed: number;
  wind_gust?: number;
  wind_deg: number;
  rain?: {
    '1h': number;
  };
  snow?: {
    '1h': number;
  };
  weather: Weather[];
}

// Hourly response structure
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
  wind_gust?: number;
  wind_deg: number;
  pop: number;
  rain?: {
    '1h': number;
  };
  snow?: {
    '1h': number;
  };
  weather: Weather[];
}

// Daily response structure
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
  wind_gust?: number;
  wind_deg: number;
  clouds: number;
  uvi: number;
  pop: number;
  rain?: number;
  snow?: number;
  weather: Weather[];
}

// Subfield in current, hourly, and daily responses
export interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

// Complete response from the API (excluding minutely forecast,
//  cause it is not used in this app) with additions of
// `address`, `lastUpdated`, `isTemp`
export interface LocationInfo {
  address: string;
  alerts?: AlertResponse[];
  current: CurrentResponse;
  daily: DailyResponse[];
  hourly: HourlyResponse[];
  isTemp: boolean;
  lastUpdated: number;
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
}
