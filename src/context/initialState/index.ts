import {
  WeatherState,
  GlobalState,
  MapState,
  FilterState,
  MessageState,
  PageState,
} from 'types';

export const initialWeatherState: WeatherState = {
  activeLocation: {
    ready: false,
    forecast: undefined,
  },
  savedLocations: [],
};

export const initialMapState: MapState = {
  lat: -35.297193845021724,
  lng: 149.1064453125,
  actualLng: 149.1064453125, // Longitude on the map can be outside the [-180, 180] range. This represents lng inside this range
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

export const initialMessageState: MessageState = {
  type: '',
  text: '',
};

export const initialPageState: PageState = {
  name: '',
  width: 0,
};

export const initialGlobalState: GlobalState = {
  weather: initialWeatherState,
  mapData: initialMapState,
  filters: initialFilterState,
  message: initialMessageState,
  page: initialPageState,
};

export const initialDispatch = () => {};
