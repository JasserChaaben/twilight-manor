import React from 'react';
import './Header.css';
import { useCookies } from 'react-cookie';
import profileImageUrl from "../Images/male-player.png"

function Header() {
  console.log()
  const [player, setPlayer, removePlayer] = useCookies(['username']);
  const logout =()=>{
 removePlayer('username', { path: '/' })
  }
  return (
    <header className="header-container">
      <nav className="header-nav">
        <ul className="header-nav-list">
          <a href='/hall'><li className="header-nav-item">Hall</li></a>
          <a href='/kitchen'> <li className="header-nav-item">Kitchen</li></a>
          <a href='/diningroom'> <li className="header-nav-item">Dining Room</li></a>
          <a href='livingroom'> <li className="header-nav-item">Living Room</li></a>
           <li className="player"  style={{ '--profile-image': `url(${profileImageUrl})`  }}>{player.username}</li>
           <li className="Logout" onClick={logout}>Log out</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
