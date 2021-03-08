import React, { useContext } from 'react';
import { GlobalStateContext, GlobalDispatchContext } from 'context';
import { Link } from 'gatsby';
import { setActiveWeather } from 'context/actions';

const SavedLocations = () => {
  const dispatch = useContext(GlobalDispatchContext);

  const {
    weather: { savedLocations },
  } = useContext(GlobalStateContext);

  return (
    <div className="saved-locations">
      {savedLocations.length &&
        savedLocations.map((location, i) => (
          <Link
            to="/"
            key={i}
            onClick={() => dispatch(setActiveWeather(location))}
            className="saved-locations__link"
          >
            {location.address}
          </Link>
        ))}
    </div>
  );
};

export default SavedLocations;
