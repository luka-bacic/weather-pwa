import LatLng from 'geodesy/latlon-spherical';
import { setMessage } from './';
import {
  LocationInfo,
  SetActiveWeatherAction,
  LoadSavedLocationAction,
} from 'types';
import { Dispatch } from 'redux';

export const fetchWeather = (weather: LocationInfo) => {
  return function (dispatch: Dispatch) {
    // Save data for offline usage
    localStorage.setItem('activeLocation', JSON.stringify(weather));

    dispatch(setActiveWeather(weather));
  };
};

// Gets active weather from local storage and writes it to the store
export const loadOldActiveWeather = () => {
  return function (dispatch: Dispatch) {
    const oldActiveWeatherRaw = localStorage.getItem('activeLocation');

    if (oldActiveWeatherRaw) {
      const oldActiveWeather = JSON.parse(oldActiveWeatherRaw);
      dispatch(setActiveWeather(oldActiveWeather));
    }
  };
};

// Gets saved locations from local storage and loads it to the store
export const loadSavedLocations = (): LoadSavedLocationAction | void => {
  // Get saved locations from local storage
  const oldSavedRaw = localStorage.getItem('savedLocations');

  console.log('in action');
  if (oldSavedRaw) {
    console.log('in action that isnot null');
    const oldSaved = JSON.parse(oldSavedRaw);

    return {
      type: 'LOAD_SAVED_LOCATIONS',
      payload: oldSaved,
    };
  }
};

export const saveLocation = (location: LocationInfo) => {
  return function (dispatch: Dispatch) {
    let savedLocations: LocationInfo[] = [];
    let isInProximity = false;
    let message = {};

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

        // If the distance is less than 1000 meters,
        // raise a flag to not save it
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

      message = {
        type: 'info',
        text: 'The location was successfully saved.',
      };

      dispatch({
        type: 'SAVE_LOCATION',
        payload: savedLocations,
      });
    } else {
      message = {
        type: 'error',
        text:
          'The location was not saved because it is within 1km of another saved location',
      };
    }

    // Let the user know what happened with the saving
    dispatch(setMessage(message));
  };
};

// Sets the given active weather to store
const setActiveWeather = (weather: LocationInfo): SetActiveWeatherAction => {
  return {
    type: 'SET_ACTIVE_WEATHER',
    payload: weather,
  };
};
