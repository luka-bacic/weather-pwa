import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

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

      // // showingInfoWindow: false,
      // activeMarker: {},
      // selectedPlace: {},

      mapCenter: defaultCenter,
      selectedLatLng: defaultCenter,
      // mapLatLng: {
      //   lat: 42,
      //   lng: 42,
      // },
    };
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
        this.setState({ mapCenter: latLng });
      })
      .catch(error => console.error('Woops: ', error));
  };

  onClick = (t, map, coord) => {
    const { latLng } = coord;

    this.setState({
      selectedLatLng: {
        lat: latLng.lat(),
        lng: latLng.lng(),
      },
    });
    console.log(latLng.lat(), latLng.lng());
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
          onClick={this.onClick}
          initialCenter={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng,
          }}
          center={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng,
          }}
          containerStyle={{
            height: '85vh',
            position: 'relative',
          }}
        >
          <Marker position={this.state.selectedLatLng} />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAP_API_V3_KEY,
})(GoogleMap);
