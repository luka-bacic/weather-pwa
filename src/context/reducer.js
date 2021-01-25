export default function reducer(state, action) {
  return new Promise(resolve => {
    switch (action.type) {
      case 'FETCH_WEATHER':
        fetch(
          `https://weather.luka-bacic.com/scripts/fetchWeather.php?lat=37.8267&lng=-122.4233`
        )
          .then(response => response.json())
          .then(data => {
            console.log(data);

            resolve({
              ...state,
              currently: data?.currently,
              minutely: data?.minutely,
              hourly: data?.hourly,
              daily: data?.daily,
              alerts: data?.alerts,
            });
          });

        break;
      default:
        resolve(state);
        break;
    }
  });
}
