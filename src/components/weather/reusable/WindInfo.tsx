import React from 'react';
import { BsArrowUp } from 'react-icons/bs';
import degreesToDirection from 'functions/degreesToDirection';

type Props = {
  degrees: number;
  speed: number;
};

const WindInfo = ({ degrees, speed }: Props) => {
  let renderDirection = false;
  let renderspeed = false;
  if (typeof degrees !== 'undefined') {
    renderDirection = true;
  }
  if (typeof speed !== 'undefined') {
    renderspeed = true;
  }
  return (
    <div className="wind-info">
      {renderDirection && (
        <span>
          <BsArrowUp
            style={{ transform: `rotate(${degrees}deg)` }}
            title={`${degreesToDirection(degrees)} wind direction`}
          />
          &nbsp;
        </span>
      )}
      {renderspeed && (
        <span>
          <strong>{speed.toFixed(0)} m/s</strong> wind speed
        </span>
      )}
    </div>
  );
};

export default WindInfo;
