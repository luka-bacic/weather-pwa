import React, { useContext, useRef } from 'react';
import { GlobalStateContext, GlobalDispatchContext } from 'context';
import { BsStar } from 'react-icons/bs';
import { saveLocation } from 'context/actions';

const StarLocation = () => {
  const wrapRef = useRef<HTMLDivElement>(null);

  const dispatch = useContext(GlobalDispatchContext);

  const {
    weather: { activeLocation },
  } = useContext(GlobalStateContext);

  const onSaveButtonClick = () => {
    dispatch(saveLocation(activeLocation.forecast!));
    if (wrapRef.current !== null) {
      wrapRef.current.classList.add('star-location--hidden');
    }
  };

  if (
    typeof activeLocation.forecast !== 'undefined' &&
    activeLocation.forecast.isTemp
  ) {
    return (
      <div className="star-location" ref={wrapRef}>
        <button
          onClick={onSaveButtonClick}
          className="star-location__button"
          title="Save location"
        >
          <BsStar className="star-location__icon" />
          <span className="sr-only">Save Location</span>
        </button>
      </div>
    );
  } else {
    return null;
  }
};

export default StarLocation;
