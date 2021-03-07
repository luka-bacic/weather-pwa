import React from 'react';
import { Link } from 'gatsby';

const Nav = () => {
  return (
    <nav>
      <Link to="/">Weather</Link>
      <Link to="/map/">Map</Link>
    </nav>
  );
};

export default Nav;
