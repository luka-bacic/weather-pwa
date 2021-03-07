import React, { useRef } from 'react';
import { Link } from 'gatsby';
import { IoMdClose, IoMdMenu } from 'react-icons/io';

const Nav = () => {
  const wrapRef = useRef<HTMLDivElement>(null);

  const toggleNavVisibility = () => {
    if (wrapRef.current !== null) {
      wrapRef.current.classList.toggle('nav--wrap-open');
      // innerRef.current.classList.toggle('nav--inner-open');
    }
  };

  return (
    <div className="nav">
      <button
        onClick={toggleNavVisibility}
        className="nav__toggler"
        title="Open menu"
      >
        <IoMdMenu />
        <span className="sr-only">Open menu</span>
      </button>

      <div className="nav__wrap" ref={wrapRef}>
        <div className="nav__spacer" onClick={toggleNavVisibility}></div>
        <nav className="nav__inner">
          <div className="nav__inner-head">
            Weather
            <button
              onClick={toggleNavVisibility}
              className="nav__toggler"
              title="Close menu"
            >
              <IoMdClose />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <Link className="nav__link" to="/">
            Weather
          </Link>
          <Link className="nav__link" to="/map/">
            Map
          </Link>
          <Link className="nav__link" to="/about/">
            About
          </Link>
          <Link className="nav__link" to="/feedback/">
            Feedback
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
