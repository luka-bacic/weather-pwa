import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { MessageState } from '../../types';
import { CSSTransition } from 'react-transition-group';
import { IoMdClose } from 'react-icons/io';

type Props = {
  message: MessageState;
};

const Toast = ({ message }: Props) => {
  const [isClosed, setIsClosed] = useState(!!message);

  useEffect(() => {
    setIsClosed(false);

    setTimeout(() => {
      setIsClosed(true);
    }, 4000);
  }, [message]);

  const closeToast = () => {
    setIsClosed(true);
  };

  return (
    <CSSTransition in={!isClosed} timeout={300} classNames="toast-">
      <div
        className={classnames({
          toast: true,
          [message.type]: true,
        })}
      >
        <p className="toast__message">{message.text}</p>
        <button onClick={closeToast} title="Close" className="toast__button">
          <IoMdClose className="toast__icon" />
          <span className="sr-only">close notification</span>
        </button>
      </div>
    </CSSTransition>
  );
};

export default Toast;
