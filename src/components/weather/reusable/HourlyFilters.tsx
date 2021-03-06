import React, { useContext, useEffect, useState } from 'react';
import { updateFilter } from 'context/actions';
import { GlobalDispatchContext, GlobalStateContext } from 'context';
import { FilterData } from 'types';

type Props = {
  data: {
    checked: boolean;
    label: string;
  };
  id: string;
};

const HourlyFilters = ({ data, id }: Props) => {
  const [checked, setChecked] = useState(data.checked);
  const dispatch = useContext(GlobalDispatchContext);

  const { filters } = useContext(GlobalStateContext);

  useEffect(() => {
    if (Object.keys(filters)) {
      if (
        id === 'temp' ||
        id === 'feelsLike' ||
        id === 'precip' ||
        id === 'rain' ||
        id === 'snow' ||
        id === 'wind' ||
        id === 'uv' ||
        id === 'clouds' ||
        id === 'pressure'
      ) {
        setChecked(filters[id].checked);
      }
    }
  });
  const handleChange = () => {
    dispatch(
      updateFilter({
        id: id,
        value: !checked,
      })
    );
  };

  return (
    <div className="filters__single">
      <input
        type="checkbox"
        name="filters"
        id={id}
        onChange={handleChange}
        checked={checked}
      />
      <label htmlFor={id}>{data.label}</label>
    </div>
  );
};

export default HourlyFilters;
