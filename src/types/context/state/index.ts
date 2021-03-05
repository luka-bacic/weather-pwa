import { LocationInfo } from 'types/forecast';

// Global state
export interface GlobalState {
  weather: WeatherState;
  // tempLocation: LocationInfo | undefined;
  // savedLocations: LocationInfo[];
  // lastMapData: MapData | undefined;
  // message: string;
}

export interface WeatherState {
  ready: boolean;
  forecast?: LocationInfo;
}
