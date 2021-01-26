export default function reducer(state, action) {
  return new Promise(resolve => {
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
              resolve({
                ...state,
                currently: data?.currently,
                minutely: data?.minutely,
                hourly: data?.hourly,
                daily: data?.daily,
                alerts: data?.alerts,
              });
            });
        } else {
          console.error('Latitude and longitude seem to be incorrect.');
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
