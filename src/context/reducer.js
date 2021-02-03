import LatLng from 'geodesy/latlon-spherical';

export default function reducer(state, action) {
  return new Promise(async resolve => {
    switch (action.type) {
      case 'FETCH_WEATHER': {
        // Check if lat and lng are valid
        if (validateArgs(action.payload.latLng)) {
          // build basic query string
          let urlParams = `lat=${action.payload.latLng.lat}&lng=${action.payload.latLng.lng}`;

          // Send request to external script to fetch weather data
          fetch(
            `https://weather.luka-bacic.com/scripts/fetchWeather.php?${urlParams}`
          )
            .then(response => response.json())
            .then(data => {
              data = {
                ...data,
                address: action.payload.address,
                nameSuggestions: action.payload.nameSuggestions,
                isTemp: true,
                lastUpdated: Date.now(),
              };

              // Save data for offline usage
              setLocalStorage('activeWeather', data);

              resolve({
                ...state,
                activeLocation: data,
                tempLocation: data,
              });
            });
        } else {
          console.error('Latitude and longitude seem to be incorrect.');
        }

        // console.log('fetched');
        break;
      }

      case 'SAVE_LOCATION': {
        let savedLocations = [];
        let isInProximity = false;
        let message;

        // Get previous saved locations, if any
        const oldData = state.savedLocations;

        if (oldData) {
          // Add old saved data
          savedLocations = savedLocations.concat(oldData);

          // Get coords of the current location being saved
          const { latitude: lat, longitude: lng } = action.payload;
          // LatLng of the location in action.payload
          const currentPoint = new LatLng(lat, lng);

          // Compare distance from the current location to previous saved locations
          oldData.forEach(location => {
            const oldPoint = new LatLng(location.latitude, location.longitude);

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
          savedLocations.push(action.payload);

          // Update saved locations
          setLocalStorage('savedLocations', savedLocations);

          message = {
            type: 'info',
            text: 'The location was successfully saved.',
          };
        } else {
          message = {
            type: 'error',
            text:
              'The location was not saved because it is within 1km of another saved location',
          };
        }

        resolve({
          ...state,
          savedLocations: savedLocations,
          message: message,
        });

        break;
      }
      case 'GET_LOCAL_DATA': {
        let oldActiveWeather, savedLocations, lastMapCoords;

        try {
          oldActiveWeather = JSON.parse(localStorage.getItem('activeWeather'));
          savedLocations = JSON.parse(localStorage.getItem('savedLocations'));
          lastMapCoords = JSON.parse(localStorage.getItem('lastMapCoords'));
        } catch (e) {
          console.log(e);
        }

        // Put old data to state
        if (oldActiveWeather) {
          resolve({
            ...state,
            activeLocation: oldActiveWeather,
            savedLocations: savedLocations,
            lastMapCoords: lastMapCoords,
          });
        }

        break;
      }
      case 'UPDATE_MAP_COORDINATES': {
        setLocalStorage('lastMapCoords', action.payload);

        resolve({
          ...state,
          lastMapCoords: {
            lat: action?.payload?.lat,
            lng: action?.payload?.lng,
          },
        });

        break;
      }
      case 'SET_MESSAGE': {
        resolve({
          ...state,
          message: {
            type: action.payload.type,
            text: action.payload.text,
          },
        });

        break;
      }
      default: {
        resolve(state);
        break;
      }
    }
  });
}

const validateArgs = args => {
  if (args.hasOwnProperty('lat')) {
    if (args.lat < -90 || args.lat > 90) {
      return false;
    }
  }

  if (args.hasOwnProperty('lng')) {
    if (args.lat < -180 || args.lat > 180) {
      return false;
    }
  }

  return true;
};

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
