export interface DataStore {
  activeLocation: LocationInfo | null;
  // tempLocation: LocationInfo | undefined;
  // savedLocations: LocationInfo[];
  // lastMapData: MapData | undefined;
  // message: string;
}

export interface MapData {
  actualLng: number;
  address: string;
  lat: number;
  lng: number;
  zoom: number;
}

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
  minutely?: MinutelyResponse[];
  timezone: string;
  timezone_offset: number;
}

export interface AlertResponse {
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

export interface MinutelyResponse {
  dt: number;
  precipitation: number;
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

export interface ExtendHourlyClasses {
  temp?: boolean;
  feels_like?: boolean;
  pressure?: boolean;
  uvi?: boolean;
  clouds?: boolean;
  wind_speed?: boolean;
  wind_deg?: boolean;
  pop?: boolean;
  rain?: boolean;
  snow?: boolean;
}

// Context types
export interface ActionObject {
  type: string;
  payload?: object;
}

export interface WeatherAction {
  type: 'SET_WEATHER';
  payload: LocationInfo;
}

export interface Reducer {
  (state: object, action: ActionObject): object;
}

export interface WeatherState {
  weather: LocationInfo;
}

export type initialWeatherState = null | LocationInfo;

export interface WeatherReducer {
  (state: initialWeatherState, action: WeatherAction): WeatherState;
}
