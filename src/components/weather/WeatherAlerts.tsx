import React, {
  useState,
  useEffect,
  useRef,
  ReactElement,
  useContext,
  TransitionEventHandler,
} from 'react';
import { AlertResponse } from 'types';
import { FiAlertTriangle } from 'react-icons/fi';
import classNames from 'classnames';
import SingleAlert from 'components/weather/reusable/SingleAlert';
import { GlobalStateContext } from 'context';

type Props = {
  alerts: AlertResponse[] | undefined;
  timezoneOffset: number;
};

const WeatherAlerts = ({ alerts, timezoneOffset }: Props) => {
  const {
    page: { width: pageWidth },
  } = useContext(GlobalStateContext);

  // Refs
  // const alertSectionRef = useRef<HTMLElement>(null);
  const dummyBtnRef = useRef<HTMLButtonElement>(null);

  // State
  const [numOfAlerts, setNumOfAlerts] = useState(0);
  const [peekMsg, setPeekMsg] = useState('No alerts for this location');
  const [showPreview, setShowPreview] = useState(false);
  const [showChildren, setShowChildren] = useState(false);
  const [renderedAlerts, setRenderedAlerts] = useState<ReactElement[]>([]);
  const [minBtnWidth, setMinBtnWidth] = useState(50);

  useEffect(() => {
    // Get min button width
    if (dummyBtnRef.current !== null) {
      setMinBtnWidth(dummyBtnRef.current.offsetWidth);
    }

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
    setShowPreview(prevState => !prevState);
  };

  const onTransitionEndHandler: TransitionEventHandler<HTMLElement> = e => {
    if (e.propertyName === 'width') {
      const target = e.target as HTMLDivElement;

      if (target.style.width === `${pageWidth}px`) {
        setShowChildren(true);
      } else {
        setShowChildren(false);
      }
    }
  };

  return (
    <section
      className="weather-alerts"
      // ref={alertSectionRef}
      style={{ width: showPreview ? `${pageWidth}px` : `${minBtnWidth}px` }}
      onTransitionEnd={onTransitionEndHandler}
    >
      <button
        className={classNames({
          'weather-alerts__preview-button': true,
          'weather-alerts--has-warning': numOfAlerts,
        })}
        onClick={toggleExpandButton}
      >
        <FiAlertTriangle className="weather-alerts__preview-icon" />
        <span className="weather-alerts__preview-text">
          {!showPreview ? numOfAlerts : peekMsg}
        </span>
      </button>

      {/* This button is used solely to determine the width when the button is 
          `collapsed` - used for transitioning the width on the real button */}
      <button
        aria-hidden="true"
        className={`weather-alerts__preview-button weather-alerts__dummy-button`}
        ref={dummyBtnRef}
      >
        <FiAlertTriangle className="weather-alerts__preview-icon" />
        <span className="weather-alerts__preview-text">{numOfAlerts}</span>
      </button>

      {showPreview &&
        showChildren &&
        renderedAlerts.length > 0 &&
        renderedAlerts}
    </section>
  );
};

export default WeatherAlerts;
