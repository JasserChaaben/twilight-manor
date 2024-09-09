import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header-container">
      <nav className="header-nav">
        <ul className="header-nav-list">
          <li className="header-nav-item">Hall</li>
          <li className="header-nav-item">Kitchen</li>
          <li className="header-nav-item">Library</li>
          <li className="header-nav-item">Dining Room</li>
          <li className="header-nav-item">Living Room</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
