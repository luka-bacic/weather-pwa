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
  const previewRef = useRef<HTMLElement | null>(null);
  // State
  const [numOfAlerts, setNumOfAlerts] = useState(0);
  const [peekMsg, setPeekMsg] = useState('No warning for this location');
  const [showPreview, setShowPreview] = useState(false);
  const [renderedAlerts, setRenderedAlerts] = useState<ReactElement[]>([]);

  useEffect(() => {
    // Write inline style for button width
    // getComputedWidth();

    if (typeof alerts !== 'undefined') {
      // Count number of alerts
      setNumOfAlerts(alerts.length);

      // Render alerts into components
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

      // Expand preview
      setShowPreview(prevState => !prevState);
    } else {
      setNumOfAlerts(0);
      setRenderedAlerts([]);
    }
  }, [alerts]);

  const toggleExpandButton = () => {
    if (previewRef.current !== null) {
      previewRef.current.classList.toggle('alert--preview-expanded');
      setShowPreview(prevState => !prevState);
    }
  };

  const getComputedWidth = () => {
    setTimeout(() => {
      // if (showPreview) {
      if (previewRef.current !== null) {
        // Get computed width
        const width = previewRef.current.offsetWidth;
        // Set inline style to transition the width properly
        previewRef.current.style.width = `${width}px`;
      }
      // }
    }, 0);
  };

  const alertClasses = classNames({
    alert: true,
    'alert--preview-expanded': showPreview,
  });

  const buttonClasses = classNames({
    'alert__preview-button': true,
    'alert--has-warning': numOfAlerts,
  });

  return (
    <section className={alertClasses} ref={previewRef}>
      <button className={buttonClasses} onClick={toggleExpandButton}>
        <FiAlertTriangle className="alert__preview-icon" />
        <span className="alert__preview-text">
          {!showPreview ? numOfAlerts : peekMsg}
        </span>
      </button>

      {showPreview && renderedAlerts.length > 0 && renderedAlerts}
    </section>
  );
};

export default WeatherAlerts;
