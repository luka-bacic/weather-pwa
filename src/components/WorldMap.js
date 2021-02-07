import React, { useContext, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { GlobalDispatchContext } from 'context/GlobalContextProvider';
import { Link } from 'gatsby';

const defaultData = {
  lat: 32,
  lng: 2,
  zoom: 4,
  address: '',
};

const WorldMap = () => {
  // Update default data with localstorage data, if present
  // This is outside of useEffect() as it is:
  //   1. Required before the first render
  //   2. Doesn't cause an instant pan to the location when map is remounted
  if (localStorage.getItem('lastMapData')) {
    const { lat, lng, zoom, address } = JSON.parse(
      localStorage.getItem('lastMapData')
    );

    defaultData.lat = lat && lat;
    defaultData.lng = lng && lng;
    defaultData.zoom = zoom && zoom;
    defaultData.address = address && address;
  }

  // Setup geosearch autocomplete provider
  const placesProvider = new OpenStreetMapProvider();
  // Configure settings for the autocomplete
  const searchControl = new GeoSearchControl({
    provider: placesProvider,
    style: 'bar',
    showMarker: false,
  });

  // Local state
  const [mapData, setMapData] = useState({
    lat: defaultData.lat,
    lng: defaultData.lng,
    zoom: defaultData.zoom,
    address: defaultData.address,
  });

  const [leaflet, setLeaflet] = useState(null);

  // Dispatch to update global state
  const dispatch = useContext(GlobalDispatchContext);

  const handleMapClick = e => {
    const newData = {
      lat: e.latlng.lat,
      lng: e.latlng.lng,
      address: `Location at ${e.latlng.lat.toFixed(
        3
      )} lat, ${e.latlng.lng.toFixed(3)} lng`,
      zoom: e.target.getZoom(),
    };

    // Update local state
    setMapData(newData);

    dispatch({
      type: 'UPDATE_MAP_DATA',
      payload: newData,
    });

    // Center map to clicked area
    e.target.panTo([newData.lat, newData.lng]);
  };

  const handleAutocompleteSelect = e => {
    const newData = {
      lat: e.location.y,
      lng: e.location.x,
      zoom: e.target.getZoom(),
      address: e.location.label,
    };
    setMapData(newData);

    dispatch({
      type: 'UPDATE_MAP_DATA',
      payload: newData,
    });
  };

  const displayWeather = () => {
    dispatch({
      type: 'FETCH_WEATHER',
      payload: mapData,
    });

    dispatch({
      type: 'UPDATE_MAP_DATA',
      payload: mapData,
    });
  };

  useEffect(() => {
    if (!localStorage.getItem('lastMapData')) {
      getApproximateLocation();
    }

    function getApproximateLocation() {
      fetch('https://ipapi.co/json')
        .then(result => result.json())
        .then(data => {
          // Save to state
          setMapData(prevState => {
            return {
              ...prevState,
              lat: data?.latitude,
              lng: data?.longitude,
            };
          });

          // Move center of map to the location
          if (leaflet) {
            leaflet.panTo([data?.latitude, data?.longitude]);
          }
        })
        .catch(error => {
          // Error might happen if uBlock origin is used, among other reasons
          console.info(`Unable to get approximate location.\n${error}`);
        });
    }
  }, [leaflet]);

  const mapCreated = map => {
    map.addControl(searchControl);
    map.on('click', handleMapClick);
    map.on('geosearch/showlocation', handleAutocompleteSelect);
    setLeaflet(map);
  };

  // react-leaflet is not compatible with SSR - render only in browser
  if (typeof window !== 'undefined') {
    return (
      <MapContainer
        center={[defaultData.lat, defaultData.lng]}
        zoom={defaultData.zoom}
        style={{ height: '50vh' }}
        whenCreated={mapCreated}
        id="map"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[mapData.lat, mapData.lng]}></Marker>

        <Link to="/" className="btn" onClick={displayWeather}>
          See weather
        </Link>
      </MapContainer>
    );
  }
};

export default React.memo(WorldMap);
