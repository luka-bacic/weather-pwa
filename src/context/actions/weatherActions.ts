import { LocationInfo } from '../../types';

export const setWeather = (weather: LocationInfo) => {
  // Save data for offline usage
  setLocalStorage('activeWeather', weather);
  return {
    type: 'SET_WEATHER',
    payload: weather,
  };
};

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
