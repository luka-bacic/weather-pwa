import React, { useContext } from 'react';
import { GlobalStateContext } from 'context';
import Nav from './Nav';

const Header = () => {
  return (
    <header className="header">
      Page name
      <Nav />
    </header>
  );
};

export default Header;
