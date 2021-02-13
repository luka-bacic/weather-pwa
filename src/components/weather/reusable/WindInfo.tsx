import React from 'react';
import { BsArrowUp } from 'react-icons/bs';
import { BiWind } from 'react-icons/bi';
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
    <span className="wind-info">
      <BiWind />
      {renderspeed && (
        <span>
          <strong>{speed.toFixed(0)} m/s</strong>
        </span>
      )}
      {renderDirection && (
        <span>
          <BsArrowUp
            style={{ transform: `rotate(${degrees}deg)` }}
            title={`${degreesToDirection(degrees)} wind direction`}
          />
          &nbsp;
        </span>
      )}
    </span>
  );
};

export default WindInfo;
