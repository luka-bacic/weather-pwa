import React, { useState, useEffect } from 'react';
import { DailyResponse } from 'types';
import { hasProp, round } from 'functions';
type Props = {
  data: DailyResponse;
};

const QuickInfo = ({ data }: Props) => {
  console.log('xa', data);

  const [renderTemp, setRenderTemp] = useState(false);
  const [renderPrecip, setRenderPrecip] = useState(false);

  const [description, setDescription] = useState('');
  const [max, setMax] = useState<number | null>(null);
  const [night, setNight] = useState<number | null>(null);
  const [precip, setPrecip] = useState<number | null>(null);
  const [rain, setRain] = useState<number | null>(null);
  const [snow, setSnow] = useState<number | null>(null);

  useEffect(() => {
    // Should the temperature section be shown
    if (hasProp(data, 'temp')) {
      setRenderTemp(true);
      if (hasProp(data.temp, 'max')) {
        setMax(round(data.temp.max, 1));
      }

      if (hasProp(data.temp, 'min')) {
        setNight(round(data.temp.min, 1));
      }
    }

    // Should the short weather description be shown
    if (hasProp(data, 'weather') && data.weather.length > 0) {
      if (hasProp(data.weather[0], 'description')) {
        setDescription(data.weather[0].description);
      }
    }

    // Should the precipitation section be shown
    if (
      hasProp(data, 'pop') ||
      hasProp(data, 'rain') ||
      hasProp(data, 'snow')
    ) {
      setRenderPrecip(true);

      // Set chance of precipitation
      if (hasProp(data, 'pop')) {
        setPrecip(data.pop * 100);
      }

      // Set chance of rainfall
      if (hasProp(data, 'rain') && typeof data.rain !== 'undefined') {
        setRain(round(data.rain, 0));
      }

      // Set chance of snowfall
      if (data.hasOwnProperty('snow') && typeof data.snow !== 'undefined') {
        setSnow(round(data.snow, 0));
      }
    }
  }, [data]);

  return (
    <section className="quick-info">
      {renderTemp && (
        <div className="quick-info__temperature">
          <div className="quick-info__temperature-wrap">
            {max !== null && (
              <div className="quick-info__temperature-column">
                <strong>{max}&deg;</strong>
                <span>Max</span>
              </div>
            )}

            {night !== null && (
              <div className="quick-info__temperature-column">
                <span>{night}&deg;</span>
                <span>Overnight min</span>
              </div>
            )}
          </div>
        </div>
      )}

      {description.length > 0 && (
        <div className="quick-info__description">{description}</div>
      )}

      {renderPrecip && (
        <div className="quick-info__precip">
          {precip !== null && (
            <div className="quick-info__precip-chance">
              <strong>{precip}%</strong> chance of any precipitation
            </div>
          )}

          {rain !== null && (
            <div className="quick-info__rain">
              <strong>{rain}mm</strong> of rain
            </div>
          )}

          {snow !== null && (
            <div className="quick-info__snow">
              <strong>{snow}mm</strong> of rain
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default QuickInfo;
