import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header-container-floor-one">
      <h1 className="header-title-floor-one">Floor One of the Mansion</h1>
      <nav className="header-nav-floor-one">
        <ul className="header-nav-list-floor-one">
          <li className="header-nav-item-floor-one">Hall</li>
          <li className="header-nav-item-floor-one">Kitchen</li>
          <li className="header-nav-item-floor-one">Library</li>
          <li className="header-nav-item-floor-one">Dining Room</li>
          <li className="header-nav-item-floor-one">Living Room</li>
          <li className="header-nav-item-floor-one">Second Floor</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
