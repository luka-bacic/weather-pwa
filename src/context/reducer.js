export default function reducer(state, action) {
  return new Promise(async resolve => {
    switch (action.type) {
      case 'FETCH_WEATHER':
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

      case 'SAVE_LOCATION':
        resolve({
          ...state,
          savedLocations: [action.payload],
        });

        break;
      case 'GET_LAST_ACTIVE_LOCATION':
        let weatherData;
        try {
          weatherData = JSON.parse(localStorage.getItem('activeWeather'));
        } catch (e) {
          console.log(e);
        }

        // Put old data to state
        if (weatherData) {
          resolve({
            ...state,
            activeLocation: weatherData,
          });
        }

        break;
      default:
        resolve(state);
        break;
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
