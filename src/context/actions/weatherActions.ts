import LatLng from 'geodesy/latlon-spherical';

import {
  LocationInfo,
  SetActiveWeatherAction,
  LoadSavedLocationAction,
  SaveLocationAction,
} from 'types';

export const setWeather = (weather: LocationInfo): SetActiveWeatherAction => {
  // Save data for offline usage
  localStorage.setItem('activeLocation', JSON.stringify(weather));

  return {
    type: 'SET_ACTIVE_WEATHER',
    payload: weather,
  };
};

export const loadSavedLocations = (
  locations: LocationInfo[]
): LoadSavedLocationAction => {
  return {
    type: 'LOAD_SAVED_LOCATIONS',
    payload: locations,
  };
};

export const saveLocation = (location: LocationInfo): SaveLocationAction => {
  let savedLocations: LocationInfo[] = [];
  let isInProximity = false;
  let message = {};
  // let currentWeatherData: LocationInfo;

  // Get previous saved locations, if any
  const oldDataRaw = localStorage.getItem('savedLocations');

  if (oldDataRaw) {
    const oldData = JSON.parse(oldDataRaw);

    // Add old saved data
    savedLocations = savedLocations.concat(oldData);

    // Get coords of the location being saved
    const { lat, lon } = location;

    // LatLng of the location being saved
    const currentPoint = new LatLng(lat, lon);

    // Compare distance from the current location to previous saved locations
    oldData.forEach((oldLocation: LocationInfo) => {
      // LatLng of the iterated location
      const oldPoint = new LatLng(oldLocation.lat, oldLocation.lon);

      // Measure distance between the two points
      const distance = oldPoint.distanceTo(currentPoint);

      // If the distance is less than 1000 meters, raise a
      // flag to not save it
      if (distance < 1000) {
        isInProximity = true;
      }
    });
  }

  // Add new location only if it is more than 1000 meters
  // away from any previously saved location
  if (!isInProximity) {
    savedLocations.push(location);

    // Update saved locations
    localStorage.setItem('savedLocations', JSON.stringify(savedLocations));
    localStorage.setItem('activeLocation', JSON.stringify(location));

    // message = {
    //   type: 'info',
    //   text: 'The location was successfully saved.',
    // };

    return {
      type: 'SAVE_LOCATION',
      payload: savedLocations,
    };
  } else {
    // message = {
    //   type: 'error',
    //   text:
    //     'The location was not saved because it is within 1km of another saved location',
    // };
    // TODO: dispatch message
  }
};
