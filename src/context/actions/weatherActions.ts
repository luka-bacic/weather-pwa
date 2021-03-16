import LatLng from 'geodesy/latlon-spherical';
import { setMessage } from './';
import {
  LocationInfo,
  SetActiveWeatherAction,
  LoadSavedLocationAction,
  MessageState,
  NoOldSavedLocationsAction,
  MapState,
  RenameLocationAction,
  LocationLatLngNewName,
} from 'types';
import { Dispatch } from 'redux';

export const fetchWeather = (mapData: MapState) => {
  return function (dispatch: Dispatch) {
    // Coordinates
    const latLng = `?lat=${mapData.lat}&lon=${mapData.actualLng}`;
    // Weather key
    const apiKey = `&appid=${process.env.GATSBY_OPEN_WEATHER_MAP_API_KEY}`;

    let weatherUrl =
      `${process.env.GATSBY_WEATHER_API_URL}` +
      latLng +
      apiKey +
      // Units
      `&units=metric` +
      // Exclude this from response
      `&exclude=minutely`;

    // Get weather
    fetch(weatherUrl)
      .then(response => response.json())
      .then(data => {
        const modifiedData: LocationInfo = {
          ...data,
          address: mapData.address,
          lastUpdated: Date.now(),
          isTemp: true,
        };

        // Save data for offline usage
        localStorage.setItem('activeLocation', JSON.stringify(modifiedData));

        dispatch(setActiveWeather(modifiedData));
      })
      .catch(error =>
        console.error('Error occurred while getting weather forecast:\n', error)
      );
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
export const loadSavedLocations = ():
  | LoadSavedLocationAction
  | NoOldSavedLocationsAction => {
  // Get saved locations from local storage
  const oldSavedRaw = localStorage.getItem('savedLocations');

  if (oldSavedRaw) {
    const oldSaved = JSON.parse(oldSavedRaw);

    return {
      type: 'LOAD_SAVED_LOCATIONS',
      payload: oldSaved,
    };
  } else {
    // Trigger default switch case
    return {
      type: 'NO_OLD_SAVED_LOCATIONS_ACTION',
    };
  }
};

export const saveLocation = (location: LocationInfo) => {
  return function (dispatch: Dispatch) {
    let savedLocations: LocationInfo[] = [];
    let isInProximity = false;
    let message: MessageState = {
      type: '',
      text: '',
    };

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
      const modifiedCurrentLocation = {
        ...location,
        isTemp: false,
      };
      savedLocations.push(modifiedCurrentLocation);

      // Update saved locations
      localStorage.setItem('savedLocations', JSON.stringify(savedLocations));
      localStorage.setItem(
        'activeLocation',
        JSON.stringify(modifiedCurrentLocation)
      );

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

export const renameLocation = (latLngName: LocationLatLngNewName) => {
  return function (dispatch: Dispatch) {
    const message: MessageState = {
      type: '',
      text: '',
    };
    // Retrieve local data
    const savedLocationsLocalRaw = localStorage.getItem('savedLocations');
    if (savedLocationsLocalRaw !== null) {
      const savedLocationsLocal: LocationInfo[] = JSON.parse(
        savedLocationsLocalRaw
      );

      // Find index of the location in question
      const index = savedLocationsLocal.findIndex(
        location =>
          location.lat === latLngName.lat && location.lon === latLngName.lng
      );

      if (index !== -1) {
        // Copy all saved locations
        const savedLocations = [...savedLocationsLocal];
        // Modify address of the location
        savedLocations[index] = {
          ...savedLocations[index],
          address: latLngName.newName,
        };

        // Update local storage
        localStorage.setItem('savedLocations', JSON.stringify(savedLocations));

        // Update message
        message.type = 'info';
        message.text = 'Location was renamed successfully';

        // Update global state with new renamed location
        dispatch({ type: 'RENAME_LOCATION', payload: savedLocations });
        // Notify user what happened
        dispatch(setMessage(message));
      } else {
        // Update message
        message.type = 'error';
        message.text = 'Something went wrong when renaming the location.';

        dispatch(setMessage(message));
      }
    }
  };
};

// Sets the given active weather to store
export const setActiveWeather = (
  weather: LocationInfo
): SetActiveWeatherAction => {
  return {
    type: 'SET_ACTIVE_WEATHER',
    payload: weather,
  };
};
