import React, { useState, useEffect } from 'react';
import { hasProp, round, getIconInfo } from 'functions';
import { CurrentResponse, IconData } from 'types';

type Props = {
  data: CurrentResponse;
};

const CurrentWeather = ({ data }: Props) => {
  const [temp, setTemp] = useState<number | null>(null);
  const [feelsLike, setFeelsLike] = useState<number | null>(null);
  const [iconData, setIconData] = useState<IconData | null>(null);

  useEffect(() => {
    if (hasProp(data, 'temp')) {
      setTemp(round(data.temp, 1));
    }

    if (hasProp(data, 'feels_like')) {
      setFeelsLike(round(data.feels_like, 1));
    }

    if (hasProp(data, 'weather') && data.weather.length > 0) {
      if (hasProp(data.weather[0], 'description')) {
        setIconData(getIconInfo(data.weather[0], '2x'));
      }
    }
  }, [data]);

  return (
    <section className="current">
      <div>
        {temp !== null && (
          <div className="current__temperature">{temp}&deg;</div>
        )}

        {feelsLike !== null && (
          <div className="current__feels-like">
            Feels like <strong>{feelsLike}&deg;</strong>
          </div>
        )}
      </div>

      {iconData !== null && (
        <img
          className="current__icon"
          src={iconData.url}
          alt={iconData.description}
        />
      )}
    </section>
  );
};

export default CurrentWeather;
