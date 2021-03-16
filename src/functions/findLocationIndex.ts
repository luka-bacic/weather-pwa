import { LocationInfo } from 'forecast';

// Finds a location in the saved locations array by comparing lat and lon
export function findLocationIndex(
  lat: number,
  lng: number,
  savedLocations: LocationInfo[]
): number {
  return savedLocations.findIndex(
    location => location.lat === lat && location.lon === lng
  );
}
