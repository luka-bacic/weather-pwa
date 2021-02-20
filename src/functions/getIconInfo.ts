import { Weather, IconData } from 'types';

export function getIconInfo(weather: Weather): IconData {
  return {
    url: weather?.icon,
    description: weather?.description,
  };
}
