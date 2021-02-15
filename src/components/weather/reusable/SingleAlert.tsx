import React, { useRef, ReactElement } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { GrClose } from 'react-icons/gr';

type Props = {
  start: number;
  end: number;
  title: string;
  content: string;
  timezoneOffset: number;
};

const SingleAlert = ({ start, end, title, content, timezoneOffset }: Props) => {
  dayjs.extend(utc);
  dayjs.extend(advancedFormat);

  const alertRef = useRef<HTMLElement | null>(null);

  const dateFormat = 'Do MMMM [at] h:mma';
  const machineDateFormat = 'YYYY-DD-MM kk:mm:ss.SSS';

  let formattedLines: ReactElement[] = [];
  let startTime = '';
  let machineStartTime = '';
  let endTime = '';
  let machineEndTime = '';

  if (typeof content !== 'undefined') {
    // Split content into lines
    const lines = content.split('\n');

    // TODO: fix regex to cover all cases
    formattedLines = lines.flatMap((line, i) => {
      let editedLine = line;

      const TOP_LEVEL_HEADING = /^(\.\.\.)(\w+\s\w+)(\.\.\.)$/gm;
      const LOW_LEVEL_HEADING = /^\.(\w+\s*\w+)\.\.\./gm;

      // Is it a top level heading?
      if (line.match(TOP_LEVEL_HEADING)) {
        editedLine = line.replace(TOP_LEVEL_HEADING, '$2');

        return <h3 key={i}>{editedLine}</h3>;
      }

      // Is there a lower level heading and a paragraph?
      if (line.match(LOW_LEVEL_HEADING)) {
        let twoLines: string[];
        twoLines = line.replace(LOW_LEVEL_HEADING, '$1___').split('___');

        return [
          <h4 key={i}>{twoLines[0]}</h4>,
          <p key={i * i + 109}>{twoLines[1]}</p>,
        ];
      }

      // Otherwise return a paragraph
      return <p key={i}>{line}</p>;
    });

    // console.log(formattedLines);
  }

  // Format start times for people and machines
  if (typeof start !== 'undefined') {
    startTime = dayjs
      .utc(start * 1000)
      .add(timezoneOffset, 'second')
      .format(dateFormat);

    machineStartTime = dayjs
      .utc(start * 1000)
      .add(timezoneOffset, 'second')
      .format(machineDateFormat);
  }

  // Format end times for people and machines
  if (typeof end !== 'undefined') {
    endTime = dayjs
      .utc(end * 1000)
      .add(timezoneOffset, 'second')
      .format(dateFormat);

    machineEndTime = dayjs
      .utc(start * 1000)
      .add(timezoneOffset, 'second')
      .format(machineDateFormat);
  }

  const toggleShowAlert = () => {
    if (alertRef.current !== null) {
      alertRef.current.classList.toggle('alert--warning-expanded');
    }
  };

  return (
    <div className="alert__single">
      <button className="alert__open-alert" onClick={toggleShowAlert}>
        {title ? title : 'See warning'}
      </button>
      <article className="alert__content" ref={alertRef}>
        {startTime && (
          <h5>
            Warning start: <time dateTime={machineStartTime}>{startTime}</time>
          </h5>
        )}
        {endTime && (
          <h5>
            Warning end: <time dateTime={machineEndTime}>{endTime}</time>
          </h5>
        )}
        <h2>{title ? title : 'Weather alert'}</h2>

        {formattedLines.length > 0 && formattedLines}

        <button className="alert__close-alert" onClick={toggleShowAlert}>
          <GrClose />
          <span className="sr-only">Close weather warning</span>
        </button>
      </article>
    </div>
  );
};

export default SingleAlert;
