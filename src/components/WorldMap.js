import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from '@react-google-maps/api';
import { GlobalDispatchContext } from '../context/GlobalContextProvider';
import Geocode from 'react-geocode';
import { Link } from 'gatsby';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const defaultCenter = {
  lat: 44,
  lng: 44,
};

const libraries = ['places'];

const WorldMap = () => {
  // Set up local state
  const [mapLatLng, setMapLatLng] = useState(defaultCenter);
  const [address, setAddress] = useState('');
  const [placeResult, setPlaceResult] = useState(null);
  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Set up dispatch
  const dispatch = useContext(GlobalDispatchContext);

  // 1. Save coordinates in state
  // 2. Get address from coordinates, save results in state
  const onMapClick = e => {
    const { latLng } = e;
    const lat = latLng.lat();
    const lng = latLng.lng();

    // 1. Save coordinates in state
    setMapLatLng({
      lat: lat,
      lng: lng,
    });

    // 2. Get address from coordinates, save results in state
    Geocode.fromLatLng(lat, lng).then(
      response => handleGeocodeResponse(response, lat, lng),
      error => handleGeocodeResponseError(error, lat, lng)
    );
  };

  // Takes a response from Geocode.fromLatLng and handles
  // errors when there is a response
  //
  // 1. Filter out google plus code result
  // 2. Extract only formatted address
  // 3. Remove duplicates from array
  // 4. Set search input value
  // 5. Save first address result in state
  // 6. Save all address names in state
  // 7. Save map data in global state
  const handleGeocodeResponse = useCallback(
    (response, lat, lng) => {
      if (response.status === 'OK') {
        if (response.results.length) {
          let allAddresses = response.results
            // 1. Filter out google plus code result
            .filter(address => {
              if (address.types.includes('plus_code')) {
                return false;
              } else {
                return true;
              }
            })
            // 2. Extract only formatted address
            .map(address => address.formatted_address);

          // 3. Remove duplicates from array
          allAddresses = [...new Set(allAddresses)];

          // 4. Set search input value
          setInputValue(allAddresses[0]);

          // 5. Save first address result in state
          setAddress(allAddresses[0]);

          // 6. Save all address names in state
          setNameSuggestions(allAddresses);

          // 7. Save map data in global state
          dispatch({
            type: 'UPDATE_OFFLINE_MAP_DATA',
            payload: {
              lat: lat,
              lng: lng,
              address: allAddresses[0],
            },
          });
        } else {
          // response.results has no elements
          console.error(
            `There are no addresses found in the response.\n${response}`
          );
        }
      } else {
        // response.status !== 'OK'
        console.error(
          `Response error when fetching address from coordinates.\nResponse: ${response.status}`
        );
      }
    },
    [dispatch]
  );
  // The API returns an error of `undefined` type if there are no
  // results for the selected location. So if the error message
  // contains `ZERO_RESULTS`, we set the name of the location
  // to be the coordinates
  const handleGeocodeResponseError = (error, lat, lng) => {
    if (error.toString().indexOf('ZERO_RESULTS') !== -1) {
      setAddress(`${lat.toPrecision(4)}, ${lng.toPrecision(4)}`);
    } else {
      console.error(
        `Error occurred while trying to retrieve the address:\n${error}`
      );
    }
  };

  const onAutocompleteLoad = result => {
    setPlaceResult(result);
  };

  // 1. Save selected location's coordinates to state
  // 2. Save selected location's address to state
  // 3. Clear old suggested names in state
  // 4. Save map coordinates in global state
  const onAutocompleteChange = () => {
    // Get place
    const place = placeResult.getPlace();

    // 1. Save selected location's coordinates to state
    setMapLatLng({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });

    // 2. Save selected location's address to state
    setAddress(place.formatted_address);

    // 3. Clear suggested names in state
    setNameSuggestions([]);

    // 4. Save map coordinates in global state
    dispatch({
      type: 'UPDATE_OFFLINE_MAP_DATA',
      payload: {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        address: place.formatted_address,
      },
    });
  };

  // Just updates input's state
  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  // Fetch weather for the given coordinates, and save
  // address and name suggestions in global state
  const displayWeather = () => {
    dispatch({
      type: 'FETCH_WEATHER',
      payload: {
        latLng: mapLatLng,
        address: address,
        nameSuggestions: nameSuggestions,
      },
    });
  };

  // 1. Set up Geocode
  // 2. Check if there is map data in local storage and use it
  // 3. If no local storage data, try to get users aproximate location to center the map around their area
  // 4. Get address from approximate location
  useEffect(() => {
    // 1. Set up Geocode
    Geocode.setApiKey(process.env.GOOGLE_MAP_API_V3_KEY);

    // 2. Check if there is map data in local storage and use it
    if (localStorage.getItem('lastMapData')) {
      const lastData = JSON.parse(localStorage.getItem('lastMapData'));

      setMapLatLng({
        lat: lastData?.lat,
        lng: lastData?.lng,
      });

      setInputValue(lastData?.address);
    } else {
      // 3. If no local storage data, try to get users aproximate location to center the map around their area
      getApproximateLocation();
    }

    // Try to get users aproximate location
    async function getApproximateLocation() {
      fetch('https://ipapi.co/json')
        .then(result => result.json())
        .then(data => {
          setMapLatLng({
            lat: data?.latitude,
            lng: data?.longitude,
          });

          // 4. Get address from approximate location
          Geocode.fromLatLng(data?.latitude, data?.longitude).then(
            response =>
              handleGeocodeResponse(response, data?.latitude, data?.longitude),
            error =>
              handleGeocodeResponseError(error, data?.latitude, data?.longitude)
          );
        })
        .catch(error => {
          // Error might happen if uBlock origin is used, among other reasons
          console.info(`Unable to get approximate location.\n${error}`);
        });
    }

    // No cleanup
    return undefined;
  }, [handleGeocodeResponse]);

  return (
    <LoadScript
      googleMapsApiKey={process.env.GOOGLE_MAP_API_V3_KEY}
      libraries={libraries}
    >
      <GoogleMap
        id="map"
        mapContainerStyle={containerStyle}
        center={mapLatLng}
        zoom={9}
        clickableIcons={false}
        onClick={onMapClick}
      >
        <Marker position={mapLatLng} />

        <Autocomplete
          onLoad={onAutocompleteLoad}
          onPlaceChanged={onAutocompleteChange}
        >
          <input
            type="text"
            name=""
            id=""
            value={inputValue}
            onChange={handleInputChange}
          />
        </Autocomplete>

        <Link to="/" className="btn" onClick={displayWeather}>
          See weather
        </Link>
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(WorldMap);
