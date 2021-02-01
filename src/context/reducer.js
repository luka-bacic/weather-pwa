import round from 'functions/round';

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
        let savedLocations = [];

        let oldCoords = {
          lat: [],
          lng: [],
        };

        const oldData = state.savedLocations;

        if (oldData) {
          // Add old saved data
          savedLocations = savedLocations.concat(oldData);

          // Save previous coordinates
          oldData.forEach(location => {
            oldCoords.lat.push(round(location.latitude, 6));
            oldCoords.lng.push(round(location.longitude, 6));
          });

          console.log(oldCoords);

          if (oldCoords.lat.includes(action.payload.latitude)) {
            console.log('same place');
          }
        }

        // Add new data
        savedLocations.push(action.payload);

        // Save old + new data to disk
        setLocalStorage('savedLocations', savedLocations);

        resolve({
          ...state,
          savedLocations: savedLocations,
        });
        break;
      case 'GET_LOCAL_DATA':
        let oldActiveWeather, savedData;

        try {
          oldActiveWeather = JSON.parse(localStorage.getItem('activeWeather'));
          savedData = JSON.parse(localStorage.getItem('savedLocations'));
        } catch (e) {
          console.log(e);
        }

        // Put old data to state
        if (oldActiveWeather) {
          resolve({
            ...state,
            activeLocation: oldActiveWeather,
            savedLocations: savedData,
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
