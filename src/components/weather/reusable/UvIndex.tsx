import React, { useEffect, useState } from 'react';
import Tooltip from 'components/Tooltip';
import { UvInfo } from 'types';
import { uvScale } from 'functions';

type Props = {
  uv: number;
};

const UvIndex = ({ uv }: Props) => {
  const [uvData, setUvData] = useState<UvInfo | undefined>(undefined);

  useEffect(() => {
    if (typeof uv !== 'undefined' && uv >= 0) {
      setUvData(uvScale(uv));
    }
  }, [uv]);

  if (typeof uvData !== 'undefined') {
    return (
      <span className="uv-info">
        <span className={`uv-info__circle ${uvData.cssClass}`}>
          <span className="sr-only">uv index</span>
        </span>
        {uvData.value}&nbsp;({uvData.description})
        <Tooltip text={uvData.longDescription} />
      </span>
    );
  } else {
    return null;
  }
};

export default React.memo(UvIndex);
