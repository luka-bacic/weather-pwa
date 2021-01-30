import React, { useState, useEffect, useContext } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from '@react-google-maps/api';
import { GlobalDispatchContext } from '../context/GlobalContextProvider';
import Geocode from 'react-geocode';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const defaultCenter = {
  lat: 37.2430548,
  lng: -115.7930198,
};

const libraries = ['places'];

const Map = () => {
  // const [initialMapLatLng, setInitialMapLatLng] = useState(defaultCenter);
  const [mapLatLng, setMapLatLng] = useState(defaultCenter);
  const [address, setAddress] = useState('');
  const [placeResult, setPlaceResult] = useState(null);
  const [nameSuggestions, setNameSuggestions] = useState([]);

  useEffect(() => {
    Geocode.setApiKey(process.env.GOOGLE_MAP_API_V3_KEY);
    // Geocode.enableDebug();
    // Geocode.fromAddress('Area 51').then(result => {
    //   console.log(result);
    // });

    // Get users aproximate location to center the map around their area
    async function getApproximateLocation() {
      fetch('https://ipapi.co/json')
        .then(result => result.json())
        .then(data => {
          setMapLatLng({
            lat: data?.latitude,
            lng: data?.longitude,
          });
          setMapLatLng({
            lat: data?.latitude,
            lng: data?.longitude,
          });
        })
        .catch(error => {
          // Error might happen if uBlock origin is used, among other reasons
          console.info(
            `Unable to get approximate location. Try disabling your adblock.\n${error}`
          );
        });
    }

    // getApproximateLocation();

    // No cleanup
    return undefined;
  }, []);

  // 1. Save coordinates in state
  // 2. Get address from coordinates (reverse geocoding)
  // 3. Save first address result in state
  // 4. Save all address names in state
  const onMapClick = e => {
    const { latLng } = e;
    const lat = latLng.lat();
    const lng = latLng.lng();

    // 1. Save coordinates in state
    setMapLatLng({
      lat: lat,
      lng: lng,
    });

    // 2. Get address from coordinates (reverse geocoding)
    Geocode.fromLatLng(lat, lng).then(
      response => {
        if (response.status === 'OK') {
          if (response.results.length) {
            const allAddresses = response.results
              // Filter out google plus code result
              .filter(address => {
                if (address.types.includes('plus_code')) {
                  return false;
                } else {
                  return true;
                }
              })
              // Extract only formatted address names
              .map(address => address.formatted_address);

            // 3. Save first address result in state
            setAddress(allAddresses[0]);

            // 4. Save all address names in state
            setNameSuggestions(allAddresses);
          } else {
            console.error(
              `There are no addresses found in the response.\n${response}`
            );
          }
        } else {
          console.error(
            `Response error when fetching address from coordinates.\nResponse: ${response.status}`
          );
        }
      },
      error => {
        // The API returns an error of `undefined` type if there are no
        // results for the selected location. So if the error message
        // contains `ZERO_RESULTS`, we set the name of the location
        // to be the coordinates
        if (error.toString().indexOf('ZERO_RESULTS') !== -1) {
          setAddress(`${lat.toPrecision(4)}, ${lng.toPrecision(4)}`);
        } else {
          console.error(
            `Error occurred while trying to retrieve the address:\n${error}`
          );
        }
      }
    );
  };

  const onAutocompleteLoad = result => {
    setPlaceResult(result);
  };

  const onAutocompleteChange = () => {
    const place = placeResult.getPlace();
    // Set marker to the selected autocomplete result
    setMapLatLng({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
    // console.log(placeResult.getPlace());
  };

  const dispatch = useContext(GlobalDispatchContext);

  return (
    <LoadScript
      googleMapsApiKey={process.env.GOOGLE_MAP_API_V3_KEY}
      libraries={libraries}
    >
      <GoogleMap
        id="map"
        mapContainerStyle={containerStyle}
        center={mapLatLng}
        zoom={10}
        clickableIcons={false}
        onClick={onMapClick}
      >
        <Marker position={mapLatLng} />

        <Autocomplete
          onLoad={onAutocompleteLoad}
          onPlaceChanged={onAutocompleteChange}
        >
          <input type="text" name="" id="" />
        </Autocomplete>

        <button
          className={'btn mx-auto'}
          onClick={() =>
            dispatch({
              type: 'FETCH_WEATHER',
              payload: mapLatLng,
            })
          }
        >
          fetch
        </button>
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(Map);
