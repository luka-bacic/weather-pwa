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
  temp: {
    checked: true,
    label: 'Temperature',
  },
  feelsLike: {
    checked: true,
    label: 'Apparent temperature',
  },
  precip: {
    checked: true,
    label: 'Precip chance',
  },
  rain: {
    checked: true,
    label: 'Rainfall',
  },
  snow: {
    checked: false,
    label: 'Snowfall',
  },
  wind: {
    checked: false,
    label: 'Wind',
  },
  uv: { checked: false, label: 'UV' },
  clouds: {
    checked: false,
    label: 'Clouds',
  },
  pressure: {
    checked: false,
    label: 'Pressure',
  },
};

export const initialGlobalState: GlobalState = {
  weather: initialWeatherState,
  mapData: initialMapState,
  filters: initialFilterState,
};

export const initialDispatch = () => {};
