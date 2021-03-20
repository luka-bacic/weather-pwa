import React, { ReactElement, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { GrClose } from 'react-icons/gr';
import Modal from 'react-modal';
import { formatAlertToHtml } from 'functions';
import { FiAlertTriangle } from 'react-icons/fi';

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
  // Bind modal to root element (for accessibility)
  Modal.setAppElement('#___gatsby');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const dateFormat = 'Do MMMM [at] h:mma';
  const machineDateFormat = 'YYYY-DD-MM kk:mm:ss.SSS';

  let formattedLines: ReactElement[] = [];
  let startTime = '';
  let machineStartTime = '';
  let endTime = '';
  let machineEndTime = '';

  if (typeof content !== 'undefined') {
    formattedLines = formatAlertToHtml(content);
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

  return (
    <div className="single-alert">
      <button
        className="single-alert__expand-button"
        onClick={() => setIsModalOpen(true)}
      >
        {title ? title : 'See warning'}
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Weather alert information"
        overlayClassName={{
          base: 'single-alert__modal-overlay',
          afterOpen: 'single-alert--overlay-after-open',
          beforeClose: 'single-alert--overlay-before-close',
        }}
        className={{
          base: 'single-alert__modal',
          afterOpen: 'single-alert--modal-after-open',
          beforeClose: 'single-alert--modal-before-close',
        }}
        closeTimeoutMS={300}
      >
        <header className="single-alert__header">
          <div className="single-alert__content">
            <div className="single-alert__header-top">
              <FiAlertTriangle className="single-alert__header-icon" />
              <button
                className="single-alert__close-button"
                onClick={() => setIsModalOpen(false)}
              >
                <GrClose />
                <span className="sr-only">Close weather warning</span>
              </button>
            </div>
            <h2 className="single-alert__title">
              {title ? title : 'Weather alert'}
            </h2>
          </div>
        </header>

        <div className="single-alert__content">
          {startTime && (
            <small className="single-alert__start-time">
              From: <time dateTime={machineStartTime}>{startTime}</time>
            </small>
          )}

          {endTime && (
            <small className="single-alert__end-time">
              To: <time dateTime={machineEndTime}>{endTime}</time>
            </small>
          )}

          {formattedLines.length > 0 && formattedLines}
        </div>
      </Modal>
    </div>
  );
};

export default SingleAlert;
