import React, { useContext, useEffect } from 'react';
import { GlobalStateContext, GlobalDispatchContext } from 'context';
import { setPageName } from 'context/actions';
import SavedLocation from 'components/reusable/SavedLocation';
import SEO from 'components/misc/SEO';

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

      <SEO
        title="Saved locations | Weather"
        description="Your saved locations will appear here. You can choose a location on the map and save it."
      />
    </div>
  );
};

export default SavedLocations;
