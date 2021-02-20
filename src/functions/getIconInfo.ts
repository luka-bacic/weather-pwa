import { Weather, IconData } from 'types';

export function getIconInfo(weather: Weather, size?: '2x' | '4x'): IconData {
  let appendSize = '';

  if (size) {
    appendSize = `@${size}`;
  }

  return {
    url: `http://openweathermap.org/img/wn/${weather.icon}${appendSize}.png`,
    description: weather?.description,
  };
}
