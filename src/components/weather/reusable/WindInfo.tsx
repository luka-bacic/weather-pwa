import React from 'react';
import { BsArrowUp } from 'react-icons/bs';
import { BiWind } from 'react-icons/bi';
import { degreesToDirection } from 'functions';

type Props = {
  degrees: number;
  speed: number;
  noIcon?: boolean;
};

const WindInfo = ({ degrees, speed, noIcon = false }: Props) => {
  return (
    <span className="wind-info">
      {!noIcon && <BiWind />}

      {typeof speed !== 'undefined' && <span>{speed.toFixed(0)} m/s</span>}

      {typeof degrees !== 'undefined' && (
        <BsArrowUp
          className="wind-info__icon"
          style={{ transform: `rotate(${degrees}deg)` }}
          title={`${degreesToDirection(degrees)} wind direction`}
        />
      )}
    </span>
  );
};

export default React.memo(WindInfo);
