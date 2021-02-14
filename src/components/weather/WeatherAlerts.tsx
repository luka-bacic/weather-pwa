import React, { useState, useEffect, useRef, ReactElement } from 'react';
import { AlertResponse } from 'types';
import { FiAlertTriangle } from 'react-icons/fi';
import classNames from 'classnames';
import { hasProp } from 'functions/hasProp';

type Props = {
  alerts: AlertResponse[] | undefined;
};

const WeatherAlerts = ({ alerts }: Props) => {
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
        alerts.map((alert, i) => {
          console.log(alert.description);
          return (
            <div className="alert__single" key={i}>
              <button className="alert__open-alert">
                {hasProp(alert, 'event') ? alert.event : 'See alert'}
              </button>
              <article className="alert__content">
                <h2>
                  {hasProp(alert, 'event') ? alert.event : 'Weather alert'}
                </h2>

                {hasProp(alert, 'description') && alert.description}
              </article>
            </div>
          );
        })
      );

      // Set preview message
      if (alerts.length === 1) {
        setPeekMsg(`${alerts.length} warning for this location`);
      } else {
        setPeekMsg(`${alerts.length} warnings for this location`);
      }
    } else {
      setNumOfAlerts(0);
    }
  }, [alerts]);

  const toggleExpandButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (previewRef.current !== null) {
      previewRef.current.classList.toggle('alert--expanded');
      toggleShowPreview(prevState => !prevState);
    }
  };

  const getComputedWidth = () => {
    if (previewRef.current !== null) {
      if (typeof window !== 'undefined') {
        // Get computed width
        const { width } = window.getComputedStyle(previewRef.current);
        // Set inline style to transition the width properly
        previewRef.current.style.width = width;
      }
    }
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
        {renderedAlerts.length && renderedAlerts}
      </div>
    </section>
  );
};

export default WeatherAlerts;
