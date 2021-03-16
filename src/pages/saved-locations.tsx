import React, { useContext, useEffect } from 'react';
import { GlobalStateContext, GlobalDispatchContext } from 'context';
import { setPageName } from 'context/actions';
import SavedLocation from 'components/reusable/SavedLocation';

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
      {savedLocations.length &&
        savedLocations.map((location, i) => (
          <SavedLocation location={location} key={i} />
        ))}
    </div>
  );
};

export default SavedLocations;
