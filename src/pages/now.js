import React, { useContext } from 'react';
import { GlobalStateContext } from '../context/GlobalContextProvider';

const Now = () => {
  const { currently } = useContext(GlobalStateContext);
  console.log(currently);
  return <div>zxsss</div>;
};

export default Now;
