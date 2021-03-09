import React, { useContext } from 'react';
import { GlobalStateContext } from 'context';
import Nav from './Nav';
import { Link } from 'gatsby';

const Header = () => {
  const {
    page: { name },
  } = useContext(GlobalStateContext);

  const pageName = name ? name : 'Page';
  return (
    <header className="header">
      <Link className="header__link" to="/saved-locations/">
        {pageName}
      </Link>
      <Nav />
    </header>
  );
};

export default Header;
