import React from 'react';
import { Link } from 'gatsby';

const Nav = () => {
  return (
    <nav>
      <Link to="/">Pick location</Link>
      <Link to="/weather/">Weather</Link>
    </nav>
  );
};

export default Nav;
