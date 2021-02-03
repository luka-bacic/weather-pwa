import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

const Toast = ({ message }) => {
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
