import { LocationInfo, WeatherAction } from 'types';

export const setWeather = (weather: LocationInfo): WeatherAction => {
  const modifiedWeather = {
    ...weather,
    id: `${weather.lat},${weather.lon}`,
  };

  // Save data for offline usage
  localStorage.setItem('activeWeather', JSON.stringify(modifiedWeather));

  return {
    type: 'SET_WEATHER',
    payload: modifiedWeather,
  };
};
