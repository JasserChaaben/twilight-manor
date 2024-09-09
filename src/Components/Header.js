import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header-container">
      <nav className="header-nav">
        <ul className="header-nav-list">
          <a href='/hall'><li className="header-nav-item">Hall</li></a>
          <a href='/kitchen'> <li className="header-nav-item">Kitchen</li></a>
          <a href='/diningroom'> <li className="header-nav-item">Dining Room</li></a>
          <a href='livingroom'> <li className="header-nav-item">Living Room</li></a>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
