import { WeatherState, GlobalState, MapState, FilterState } from 'types';

export const initialWeatherState: WeatherState = {
  ready: false,
};

export const initialMapState: MapState = {
  lat: 32,
  lng: 2,
  actualLng: 2, // Longitude on the map can be outside the [-180, 180] range. This represents lng inside this range
  zoom: 4,
  address: '',
};

export const initialFilterState: FilterState = {
  temp: true,
  feelsLike: true,
  precip: true,
  rain: true,
  snow: false,
  wind: false,
  uv: false,
  clouds: false,
  pressure: false,
};

export const initialGlobalState: GlobalState = {
  weather: initialWeatherState,
  mapData: initialMapState,
  filters: initialFilterState,
};

export const initialDispatch = () => {};
