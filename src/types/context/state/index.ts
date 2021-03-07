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
  activeLocation: {
    ready: boolean;
    forecast: LocationInfo;
  };
  savedLocations: LocationInfo[];
}

export interface MapState {
  actualLng: number;
  address: string;
  lat: number;
  lng: number;
  zoom: number;
}

export interface FilterState {
  temp: {
    checked: boolean;
    label: string;
  };
  feelsLike: {
    checked: boolean;
    label: string;
  };
  precip: {
    checked: boolean;
    label: string;
  };
  rain: {
    checked: boolean;
    label: string;
  };
  snow: {
    checked: boolean;
    label: string;
  };
  wind: {
    checked: boolean;
    label: string;
  };
  uv: {
    checked: boolean;
    label: string;
  };
  clouds: {
    checked: boolean;
    label: string;
  };
  pressure: {
    checked: boolean;
    label: string;
  };
}
