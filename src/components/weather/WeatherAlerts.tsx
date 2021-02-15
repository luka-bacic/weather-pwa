import React, { useState, useEffect, useRef, ReactElement } from 'react';
import { AlertResponse } from 'types';
import { FiAlertTriangle } from 'react-icons/fi';
import classNames from 'classnames';
import SingleAlert from 'components/weather/reusable/SingleAlert';

type Props = {
  alerts: AlertResponse[] | undefined;
  timezoneOffset: number;
};

const WeatherAlerts = ({ alerts, timezoneOffset }: Props) => {
  // Ref to calculate button width
  const previewRef = useRef<HTMLButtonElement | null>(null);
  // State
  const [numOfAlerts, setNumOfAlerts] = useState(0);
  const [peekMsg, setPeekMsg] = useState('No warning for this location');
  const [showPreview, toggleShowPreview] = useState(false);
  const [renderedAlerts, setRenderedAlerts] = useState<ReactElement[]>([]);

  useEffect(() => {
    // Write inline style for button width
    getComputedWidth();

    if (typeof alerts !== 'undefined') {
      setNumOfAlerts(alerts.length);

      setRenderedAlerts(
        alerts.map((alert, i) => (
          <SingleAlert
            start={alert.start}
            end={alert.end}
            title={alert.event}
            content={alert.description}
            timezoneOffset={timezoneOffset}
            key={i}
          />
        ))
      );

      // Set preview message
      if (alerts.length === 1) {
        setPeekMsg(`${alerts.length} warning for this location`);
      } else {
        setPeekMsg(`${alerts.length} warnings for this location`);
      }
    } else {
      setNumOfAlerts(0);
      setRenderedAlerts([]);
    }
  }, [alerts]);

  const toggleExpandButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (previewRef.current !== null) {
      previewRef.current.classList.toggle('alert--expanded');
      toggleShowPreview(prevState => !prevState);
    }
  };

  const getComputedWidth = () => {
    setTimeout(() => {
      if (previewRef.current !== null) {
        // Get computed width
        const width = previewRef.current.offsetWidth;
        // Set inline style to transition the width properly
        previewRef.current.style.width = `${width}px`;
      }
    }, 0);
  };

  const buttonClasses = classNames({
    alert__button: true,
    'alert--has-warning': numOfAlerts,
    'alert--expanded': showPreview,
  });

  return (
    <section className="alert">
      <button
        className={buttonClasses}
        onClick={toggleExpandButton}
        ref={previewRef}
      >
        <FiAlertTriangle className="alert__icon" />
        <span className="alert__preview-text">
          {!showPreview ? numOfAlerts : peekMsg}
        </span>
      </button>

      <div className="alert__all-warnings">
        {renderedAlerts.length > 0 && renderedAlerts}
      </div>
    </section>
  );
};

export default WeatherAlerts;
