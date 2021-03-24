import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { GlobalStateContext } from 'context';
import Nav from './Nav';
import { Link } from 'gatsby';
import { useLocation } from '@reach/router';
import StarLocation from '../misc/StarLocation';
const Header = () => {
  const [pageName, setPageName] = useState('Weather');
  const [headerLink, setHeaderLink] = useState<ReactElement | null>(null);
  const { pathname: currentPage } = useLocation();

  const {
    page: { name },
  } = useContext(GlobalStateContext);

  // Set page name
  useEffect(() => {
    if (name) {
      setPageName(name);
    }
  }, [currentPage, name]);

  // Set left most link in header
  useEffect(() => {
    if (currentPage === '/saved-locations/') {
      setHeaderLink(
        <>
          <p className="header__text">Saved locations |</p>
          <Link className="header__link" to="/">
            Go back
          </Link>
        </>
      );
    } else if (currentPage === '/') {
      setHeaderLink(
        <Link className="header__link" to="/saved-locations/">
          {pageName}
        </Link>
      );
    } else {
      setHeaderLink(
        <Link className="header__link" to="/">
          {pageName}
        </Link>
      );
    }
  }, [pageName]);

  return (
    <header className="header">
      {headerLink !== null && headerLink}
      {currentPage === '/' && <StarLocation />}
      <Nav />
    </header>
  );
};

export default Header;
