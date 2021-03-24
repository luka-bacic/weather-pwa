import React, { useState } from 'react';
import { Link } from 'gatsby';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import Modal from 'react-modal';

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
  Modal.setAppElement('#___gatsby');

  const [isOpen, setIsOpen] = useState(false);

  // Toggle open state
  const toggleNavVisibility = () => {
    setIsOpen(prev => !prev);
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

      <Modal
        isOpen={isOpen}
        closeTimeoutMS={300}
        overlayClassName={{
          base: 'nav__overlay',
          afterOpen: 'nav--overlay-after-open',
          beforeClose: 'nav--overlay-before-close',
        }}
        className={{
          base: 'nav__menu',
          afterOpen: 'nav--menu-after-open',
          beforeClose: 'nav--menu-before-close',
        }}
        onRequestClose={toggleNavVisibility}
        preventScroll={true}
      >
        <nav className="nav__nav">
          <div className="nav__menu-head">
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
      </Modal>
    </div>
  );
};

export default Nav;
