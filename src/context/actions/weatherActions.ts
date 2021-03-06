import { LocationInfo, WeatherAction } from 'types';

export const setWeather = (weather: LocationInfo): WeatherAction => {
  // Save data for offline usage
  localStorage.setItem('activeWeather', JSON.stringify(weather));

  return {
    type: 'SET_WEATHER',
    payload: weather,
  };
};
