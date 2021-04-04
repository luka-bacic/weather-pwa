import React, { useContext, useEffect } from 'react';
import { GlobalStateContext, GlobalDispatchContext } from 'context';
import { setPageName } from 'context/actions';
import SavedLocation from 'components/reusable/SavedLocation';
import { Helmet } from 'react-helmet';

const SavedLocations = () => {
  const dispatch = useContext(GlobalDispatchContext);

  const {
    weather: { savedLocations },
  } = useContext(GlobalStateContext);

  useEffect(() => {
    dispatch(setPageName('Saved locations'));
  }, [dispatch]);

  return (
    <div className="saved-locations">
      {savedLocations.length > 0 ? (
        savedLocations.map((location, i) => (
          <SavedLocation location={location} key={i} />
        ))
      ) : (
        <p>Your saved locations will appear here.</p>
      )}

      <Helmet>
        <title>Saved locations | Weather</title>
        <meta
          name="description"
          content="Your saved locations will appear here. You can choose a location on the map and save it."
        />
      </Helmet>
    </div>
  );
};

export default SavedLocations;
