import React, { useContext, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { GlobalDispatchContext } from 'context';
import { initialMapState } from 'context/initialState';
import { Link } from 'gatsby';
import { updateMapData, fetchWeather } from 'context/actions';
import { LeafletEventHandlerFn, LeafletMouseEvent, Map } from 'leaflet';

const WorldMap = () => {
  // Update default data with localstorage data, if present
  // This is outside of useEffect() as it
  // Doesn't cause an instant pan to the location when map is remounted
  const oldDataRaw = localStorage.getItem('lastMapData');

  if (oldDataRaw !== null) {
    const oldData = JSON.parse(oldDataRaw);

    if (typeof oldData.lat !== 'undefined') {
      initialMapState.lat = oldData.lat;
    }
    if (typeof oldData.lng !== 'undefined') {
      initialMapState.lng = oldData.lng;
    }
    if (typeof oldData.actualLng !== 'undefined') {
      initialMapState.actualLng = oldData.actualLng;
    }
    if (typeof oldData.zoom !== 'undefined') {
      initialMapState.zoom = oldData.zoom;
    }
    if (typeof oldData.address !== 'undefined') {
      initialMapState.address = oldData.address;
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
    lat: initialMapState.lat,
    lng: initialMapState.lng,
    actualLng: initialMapState.actualLng,
    zoom: initialMapState.zoom,
    address: initialMapState.address,
  });

  // Leaflet map instance
  const [leaflet, setLeaflet] = useState<Map | null>(null);

  // Dispatch to update global state
  const dispatch = useContext(GlobalDispatchContext);

  const handleMapClick = (e: LeafletMouseEvent) => {
    const { lat, lng } = e.target.wrapLatLng([e.latlng.lat, e.latlng.lng]);

    let geocodeUrl =
      `${process.env.GATSBY_REVERSE_GEOLOC_API_URL}` +
      `?lat=${lat}&lon=${lng}` +
      `&appid=${process.env.GATSBY_OPEN_WEATHER_MAP_API_KEY}`;

    // Reverse geocode to get name of place
    fetch(geocodeUrl)
      .then(response => response.json())
      .then(results => {
        let address = '';
        if (results.length) {
          // Get first result
          address = results[0].name;
        } else {
          // Name the location by coordinates
          address = `Location at ${lat.toFixed(3)} lat, ${lng.toFixed(3)} lon`;
        }

        // Update address
        setMapData(prevState => {
          return {
            ...prevState,
            address: address,
          };
        });
      });

    // Update lat and lng
    const newData = {
      lat: lat,
      lng: e.latlng.lng,
      actualLng: lng,
    };

    // Update local state
    setMapData(prevState => {
      return {
        ...prevState,
        ...newData,
      };
    });

    dispatch(updateMapData(newData));

    // Center map to clicked area
    e.target.panTo([e.latlng.lat, e.latlng.lng]);
  };

  const handleAutocompleteSelect = (e: any) => {
    const newData = {
      lat: parseFloat(e.location.y),
      lng: parseFloat(e.location.x),
      actualLng: parseFloat(e.location.x),
      zoom: parseFloat(e.target.getZoom()),
      address: e.location.label,
    };
    setMapData(newData);

    dispatch(updateMapData(newData));
  };

  const handleZoomEnd: LeafletEventHandlerFn = e => {
    const zoomLevel = { zoom: e.target.getZoom() };

    setMapData(prevState => {
      return {
        ...prevState,
        ...zoomLevel,
      };
    });

    dispatch(updateMapData(zoomLevel));
  };

  const getWeather = () => {
    dispatch(fetchWeather(mapData));
    dispatch(updateMapData(mapData));
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
          if (leaflet !== null) {
            leaflet.panTo([data?.latitude, data?.longitude]);
          }
        })
        .catch(error => {
          // Error might happen if uBlock origin is used, among other reasons
          console.info(`Unable to get approximate location.\n${error}`);
        });
    }
  }, [leaflet]);

  const mapCreated = (map: Map) => {
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
          center={[initialMapState.lat, initialMapState.lng]}
          zoom={initialMapState.zoom}
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
        <Link to="/" className="btn" onClick={getWeather}>
          See weather
        </Link>
      </div>
    );
  } else {
    return null;
  }
};

export default React.memo(WorldMap);
