import React from "react";
import "./Header.css";
import { useCookies } from "react-cookie";
import maleProfileImageUrl from "../Images/male-player.png";
import femaleProfileImageUrl from "../Images/female-player.png";
import { useNavigate } from "react-router-dom";

function Header({ name, gender, playerUpdate }) {
  const [username, setPlayer, removePlayer] = useCookies(["username"]);
  const navigate = useNavigate();
  const logout = () => {
    removePlayer("username", { path: "/" });
    navigate("/");
    window.location.reload();
  };
  return (
    <header className="header-container">
      <nav className="header-nav">
        <ul className="header-nav-list">
          <a href="/hall">
            <li className="header-nav-item">Hall</li>
          </a>
          <a href="/kitchen">
            {" "}
            <li className="header-nav-item">Kitchen</li>
          </a>
          <a href="/diningroom">
            {" "}
            <li className="header-nav-item">Dining Room</li>
          </a>
          <a href="/livingroom">
            {" "}
            <li className="header-nav-item">Living Room</li>
          </a>
          <li
            className="player"
            style={
              gender == 0
                ? { "--profile-image": `url(${maleProfileImageUrl})` }
                : { "--profile-image": `url(${femaleProfileImageUrl})` }
            }
          >
            {name}
          </li>
          <li className="Logout" onClick={logout}>
            Log out
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
