import React, { useRef } from 'react';
import { Link } from 'gatsby';
import { IoMdClose, IoMdMenu } from 'react-icons/io';

const links = [
  {
    link: '/',
    text: 'Weather',
  },
  {
    link: '/map/',
    text: 'Pick Location',
  },
  //   {
  // link : '/about/',
  // text: 'About'
  //   },
  //   {
  // link : '/feedback',
  // text: 'Feedback'
  //   },
];

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

          {links.map((page, i) => (
            <Link
              className="nav__link"
              to={page.link}
              onClick={toggleNavVisibility}
              key={i}
            >
              {page.text}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Nav;
