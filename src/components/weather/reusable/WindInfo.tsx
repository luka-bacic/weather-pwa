import React from 'react';
import { BsArrowUp } from 'react-icons/bs';
import { BiWind } from 'react-icons/bi';
import { degreesToDirection } from 'functions';

type Props = {
  degrees: number;
  speed: number;
};

const WindInfo = ({ degrees, speed }: Props) => {
  return (
    <span className="wind-info">
      <BiWind />
      {typeof speed !== 'undefined' && (
        <span>
          <strong>{speed.toFixed(0)} m/s</strong>
        </span>
      )}
      {typeof degrees !== 'undefined' && (
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

export default React.memo(WindInfo);
