import './Hallway.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Hallway({ goToSecondFloor, name, level, LevelUp }) {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
      goToSecondFloor();
      navigate("/hall");
      window.location.reload();
    
  };

  return (
    <div className="hallway-container">
      <h1 className="hallway-title">Hallway</h1>
      <div className="hallway-content">
        <h3>
        The second-floor hallway stretches out in eerie silence, cloaked in dust and decay. Faded wallpaper, once vibrant, now peels away to reveal darkened wood beneath. Dim light filters through cracked windows, casting long shadows that twist and bend along the floor. Old portraits of long-forgotten faces line the walls, their eyes following {name} with unsettling intensity. The air is thick with the scent of mildew, and the faint echo of footsteps from a past long gone seems to reverberate through the narrow, creaking floorboards. Whispers of the mansion’s grim history linger in the oppressive stillness.
        </h3>
        <button className="hallway-button" onClick={handleButtonClick}>First Floor</button>
      </div>
    </div>
  );



};

export default Hallway;
