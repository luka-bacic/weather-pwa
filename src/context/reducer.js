export default function reducer(state, action) {
  return new Promise(async resolve => {
    switch (action.type) {
      case 'FETCH_WEATHER':
        // Check if lat and lng are valid
        if (validateArgs(action.payload)) {
          // build basic query string
          let urlParams = `lat=${action.payload.lat}&lng=${action.payload.lng}`;

          fetch(
            `https://weather.luka-bacic.com/scripts/fetchWeather.php?${urlParams}`
          )
            .then(response => response.json())
            .then(data => {
              data = {
                ...data,
                isTemp: true,
                lastUpdated: Date.now(),
              };

              if (localStorage.getItem('weather')) {
                let oldLat, oldLng, oldWeather;

                try {
                  oldWeather = JSON.parse(localStorage.getItem('weather'));
                  oldLat = oldWeather.latitude;
                  oldLng = oldWeather.longitude;

                  // Check if the location is the same
                  if (oldLat === data.latitude && oldLng === data.longitude) {
                    console.log('balls');
                  } else {
                    console.log('not same');
                  }
                  console.log(data);
                } catch (e) {
                  if (e instanceof SyntaxError) {
                    console.log('Incorrect JSON format.\n', e);
                  } else {
                    throw e;
                  }
                }
              }

              // Save data for offline usage
              setLocalStorage('weather', data);

              resolve({
                ...state,
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
