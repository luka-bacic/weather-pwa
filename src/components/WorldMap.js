import React, { useContext, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
// import { GlobalStateContext } from 'context/GlobalContextProvider';
// import AutoComplete from 'components/AutoComplete';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { GlobalDispatchContext } from 'context/GlobalContextProvider';

const defaultData = {
  lat: 34,
  lng: 2,
  zoom: 2,
};

if (localStorage.getItem('lastMapData')) {
  const { lat, lng, zoom, address } = JSON.parse(
    localStorage.getItem('lastMapData')
  );

  defaultData.lat = lat || 34;
  defaultData.lng = lng || 2;
  defaultData.zoom = zoom || 2;
  defaultData.address = address || '';
}

const WorldMap = () => {
  // Setup geosearch autocomplete provider
  const placesProvider = new OpenStreetMapProvider();
  // Configure settings for the autocomplete
  const searchControl = new GeoSearchControl({
    provider: placesProvider,
    style: 'bar',
    showMarker: false,
  });

  // Local state
  const [mapLatLng, setMapLatLng] = useState([
    defaultData.lat,
    defaultData.lng,
  ]);

  // Dispatch to update global state
  const dispatch = useContext(GlobalDispatchContext);

  const handleMapClick = e => {
    // Get coordinates
    const latLng = [e.latlng.lat, e.latlng.lng];

    // Update local state
    setMapLatLng(latLng);

    // Center map to clicked area
    e.target.panTo(latLng);
  };

  const handleAutocompleteSelect = e => {
    setMapLatLng({
      lat: e.location.y,
      lng: e.location.x,
    });

    dispatch({
      type: 'UPDATE_MAP_DATA',
      payload: {
        lat: e.location.y,
        lng: e.location.x,
        zoom: e.target.getZoom(),
        address: e.location.label,
      },
    });
  };

  const mapReady = map => {
    map.addControl(searchControl);
    map.on('click', handleMapClick);
    map.on('geosearch/showlocation', handleAutocompleteSelect);
  };

  // react-leaflet is not compatible with SSR - render only in browser
  if (typeof window !== 'undefined') {
    return (
      <MapContainer
        center={[defaultData.lat, defaultData.lng]}
        zoom={defaultData.zoom}
        style={{ height: '50vh' }}
        whenCreated={mapReady}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={mapLatLng}></Marker>
      </MapContainer>
    );
  }
};

export default React.memo(WorldMap);
