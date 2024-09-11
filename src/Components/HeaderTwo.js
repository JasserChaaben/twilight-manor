import React from 'react';
import './Header.css';
import { useCookies } from 'react-cookie';
import maleProfileImageUrl from "../Images/male-player.png"
import femaleProfileImageUrl from "../Images/female-player.png"
import { useNavigate } from 'react-router-dom';

function HeaderTwo({name , gender , playerUpdate} ) {
  const [username, setPlayer, removePlayer] = useCookies(['username']);
  const navigate= useNavigate();
  const logout =()=>{
 removePlayer('username', { path: '/' })
 navigate("/");
 window. location.reload();
  }
  return (
    <header className="header-container">
      <nav className="header-nav">
        <ul className="header-nav-list">
          <a href='/hallway'><li className="header-nav-item">Hallway</li></a>
          <a href='/library'> <li className="header-nav-item">Library</li></a>
          <a href='/mainbedroom'> <li className="header-nav-item">Main Bedroom</li></a>
          <a href='/kidbedroom'> <li className="header-nav-item">Kids Bedroom</li></a>
           <li className="player"  style={gender==0?{ '--profile-image': `url(${maleProfileImageUrl})`  }:{ '--profile-image': `url(${femaleProfileImageUrl})`  }}>{name}</li>
           <li className="Logout" onClick={logout}>Log out</li>
        </ul>
      </nav>
    </header>
  );
}

export default HeaderTwo;
