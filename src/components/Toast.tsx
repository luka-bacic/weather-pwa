import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { MessageState } from '../types';

type Props = {
  message: MessageState;
};
const Toast = ({ message }: Props) => {
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    setIsClosed(false);
  }, [message]);

  let classes = classnames({
    toast: true,
    [message.type]: true,
    closed: isClosed,
  });

  const closeToast = () => {
    setIsClosed(true);
  };

  return (
    <div className={classes}>
      {message.text}
      <button onClick={closeToast}>X</button>
    </div>
  );
};

export default Toast;
