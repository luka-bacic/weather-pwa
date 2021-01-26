import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { GlobalDispatchContext } from 'context/GlobalContextProvider';
import { Link } from 'gatsby';

const defaultCenter = {
  lat: 44,
  lng: 44,
};

export class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // for google map places autocomplete
      address: '',
      approximateLatLng: {
        lat: undefined,
        lng: undefined,
      },
      mapLatLng: defaultCenter,
    };
  }

  async componentDidMount() {
    // Get users aproximate location to center the map around their area
    await fetch('https://ipapi.co/json')
      .then(result => result.json())
      .then(data => {
        this.setState({
          approximateLatLng: {
            lat: data?.latitude,
            lng: data?.longitude,
          },
        });
      })
      .catch(error => {
        // Error might happen if uBlock origin is used, among other reasons
        console.error(
          `Unable to get approximate location. Try disabling your adblock.\n${error}`
        );
      });

    if (typeof this.state.approximateLatLng.lat !== 'undefined') {
      this.setState({
        mapLatLng: {
          lat: this.state.approximateLatLng.lat,
          lng: this.state.approximateLatLng.lng,
        },
      });
    }
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    this.setState({ address });

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        // update center state
        this.setState({ mapLatLng: latLng });
      })
      .catch(error => console.error('Woops: ', error));
  };

  handleMapClick = (t, map, coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    this.setState({
      mapLatLng: {
        lat: lat,
        lng: lng,
      },
    });
  };

  fetchWeather = () => {
    const dispatch = this.context;

    dispatch({
      type: 'FETCH_WEATHER',
      payload: this.state.mapLatLng,
    });
  };

  render() {
    return (
      <div id="map">
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}

                {suggestions.map((suggestion, i) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';

                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };

                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                      key={i}
                    >
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

        <Map
          google={this.props.google}
          onClick={this.handleMapClick}
          initialCenter={{
            lat: this.state.mapLatLng.lat,
            lng: this.state.mapLatLng.lng,
          }}
          center={{
            lat: this.state.mapLatLng.lat,
            lng: this.state.mapLatLng.lng,
          }}
          containerStyle={{
            height: '85vh',
            position: 'relative',
          }}
        >
          <Marker position={this.state.mapLatLng} />
        </Map>

        <Link to="/now/" className={'btn mx-auto'} onClick={this.fetchWeather}>
          fetch
        </Link>
      </div>
    );
  }
}

GoogleMap.contextType = GlobalDispatchContext;

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAP_API_V3_KEY,
})(GoogleMap);
