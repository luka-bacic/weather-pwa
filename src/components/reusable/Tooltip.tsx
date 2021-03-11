import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

type Props = {
  text: string;
};

const Tooltip = ({ text }: Props) => {
  const showTooltip = (e: any) => {
    e.target.classList.toggle('open');
  };

  return (
    <button onFocus={showTooltip} onBlur={showTooltip} className="tooltip">
      <AiOutlineInfoCircle className="tooltip__icon" />
      <div className="tooltip__content">{text}</div>
    </button>
  );
};

export default Tooltip;
