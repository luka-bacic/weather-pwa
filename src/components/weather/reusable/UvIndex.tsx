import React from 'react';
import Tooltip from 'components/Tooltip';

import uvScale from 'functions/uvScale';

type Props = {
  uv: number;
};

const UvIndex = ({ uv }: Props) => {
  const uvData = uvScale(uv);

  return (
    <span className="uv-info">
      <span className={`uv-info__circle ${uvData.cssClass}`}>
        <span className="sr-only">uv index</span>
      </span>
      {uvData.value}&nbsp;({uvData.description})
      <Tooltip text={uvData.longDescription} />
    </span>
  );
};

export default UvIndex;
