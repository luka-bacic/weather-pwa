import React, { useContext } from 'react';
import { GlobalStateContext } from 'context';
import Nav from './Nav';
import { Link } from 'gatsby';

const Header = () => {
  return (
    <header className="header">
      <Link className="header__link" to="/saved-locations/">
        Saved locations [current location]
      </Link>
      <Nav />
    </header>
  );
};

export default Header;
