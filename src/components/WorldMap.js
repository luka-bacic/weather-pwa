import React, { useContext, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { GlobalDispatchContext } from 'context';
import { Link } from 'gatsby';

const defaultData = {
  lat: 32,
  lng: 2,
  actualLng: 2, // Longitude on the map can be outside the [-180, 180] range. This represents lng inside this range
  zoom: 4,
  address: '',
};

const WorldMap = () => {
  // Update default data with localstorage data, if present
  // This is outside of useEffect() as it is:
  //   1. Required before the first render
  //   2. Doesn't cause an instant pan to the location when map is remounted
  if (localStorage.getItem('lastMapData')) {
    const oldData = JSON.parse(localStorage.getItem('lastMapData'));

    if (typeof oldData.lat !== 'undefined') {
      defaultData.lat = oldData.lat;
    }
    if (typeof oldData.lng !== 'undefined') {
      defaultData.lng = oldData.lng;
    }
    if (typeof oldData.actualLng !== 'undefined') {
      defaultData.actualLng = oldData.actualLng;
    }
    if (typeof oldData.zoom !== 'undefined') {
      defaultData.zoom = oldData.zoom;
    }
    if (typeof oldData.address !== 'undefined') {
      defaultData.address = oldData.address;
    }
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
    actualLng: defaultData.actualLng,
    zoom: defaultData.zoom,
    address: defaultData.address,
  });

  // Leaflet map instance
  const [leaflet, setLeaflet] = useState(null);

  // Dispatch to update global state
  const dispatch = useContext(GlobalDispatchContext);

  const handleMapClick = e => {
    const { lat, lng } = e.target.wrapLatLng([e.latlng.lat, e.latlng.lng]);

    const newData = {
      lat: lat,
      lng: e.latlng.lng,
      actualLng: lng,
      address: `Location at ${lat.toFixed(3)} lat, ${lng.toFixed(3)} lng`,
    };

    // Update local state
    setMapData(prevState => {
      return {
        ...prevState,
        ...newData,
      };
    });

    dispatch({
      type: 'UPDATE_MAP_DATA',
      payload: newData,
    });

    // Center map to clicked area
    e.target.panTo([e.latlng.lat, e.latlng.lng]);
  };

  const handleAutocompleteSelect = e => {
    const newData = {
      lat: e.location.y,
      lng: e.location.x,
      actualLng: e.location.x,
      zoom: e.target.getZoom(),
      address: e.location.label,
    };
    setMapData(newData);

    dispatch({
      type: 'UPDATE_MAP_DATA',
      payload: newData,
    });
  };

  const handleZoomEnd = e => {
    const zoomLevel = { zoom: e.target.getZoom() };
    setMapData(prevState => {
      return {
        ...prevState,
        ...zoomLevel,
      };
    });

    dispatch({
      type: 'UPDATE_MAP_DATA',
      payload: zoomLevel,
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
    map.on('zoomend', handleZoomEnd);
    map.on('geosearch/showlocation', handleAutocompleteSelect);
    setLeaflet(map);
  };

  // react-leaflet is not compatible with SSR - render only in browser
  if (typeof window !== 'undefined') {
    return (
      <div>
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
        </MapContainer>
        <Link to="/" className="btn" onClick={displayWeather}>
          See weather
        </Link>
      </div>
    );
  }
};

export default React.memo(WorldMap);
