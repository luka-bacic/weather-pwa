import React, { useEffect, useContext, useState, ReactElement } from 'react';
import { GlobalStateContext } from 'context';
import HourlyFilter from 'components/weather/reusable/HourlyFilters';
const Filters = () => {
  const { filters } = useContext(GlobalStateContext);

  const [renderedFilters, setRenderedFilters] = useState<ReactElement[]>([]);

  useEffect(() => {
    if (Object.keys(filters)) {
      let i = 0;
      let allFilters: ReactElement[] = [];

      for (const key in filters) {
        if (Object.prototype.hasOwnProperty.call(filters, key)) {
          if (
            key === 'temp' ||
            key === 'feelsLike' ||
            key === 'precip' ||
            key === 'rain' ||
            key === 'snow' ||
            key === 'wind' ||
            key === 'uv' ||
            key === 'clouds' ||
            key === 'pressure'
          ) {
            allFilters.push(
              <HourlyFilter key={i} data={filters[key]} id={key} />
            );
            i++;
          }
        }
      }

      setRenderedFilters(allFilters);
    }
  }, []);
  return <div className="filters">{renderedFilters}</div>;
};

export default Filters;
