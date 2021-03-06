import { LocationInfo } from 'types/forecast';

// Global state
export interface GlobalState {
  weather: WeatherState;
  // tempLocation: LocationInfo | undefined;
  // savedLocations: LocationInfo[];
  mapData: MapState;
  // message: string;
  filters: FilterState;
}

export interface WeatherState {
  ready: boolean;
  forecast?: LocationInfo;
}

export interface MapState {
  actualLng: number;
  address: string;
  lat: number;
  lng: number;
  zoom: number;
}

export interface FilterState {
  temp: boolean;
  feelsLike: boolean;
  precip: boolean;
  rain: boolean;
  snow: boolean;
  wind: boolean;
  uv: boolean;
  clouds: boolean;
  pressure: boolean;
}
