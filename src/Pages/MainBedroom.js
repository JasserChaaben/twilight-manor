import './MainBedroom.css';
import React from 'react';

function MainBedroom({  name, level, LevelUp }) {

  const handleButtonClick = () => {
  };

  return (
    <div className="main-bedroom-container">
      <h1 className="main-bedroom-title">Main Bedroom</h1>
      <div className="main-bedroom-content">
        <h3>
        The Main Bedroom stretches out before {name}, its grandeur diminished by years of neglect. An ornate bed, draped with tattered curtains, dominates the room, its once-luxurious canopy now sagging. Heavy drapes block most of the light, casting the room in a dim, oppressive gloom. {name} notices an antique vanity cluttered with broken glass and faded trinkets, hinting at a past now forgotten. A grand wardrobe stands silently against the wall, its contents long lost to time. The floorboards creak underfoot, amplifying the eerie silence and suggesting that this room holds memories and secrets from the mansion’s dark past.
        </h3>
        <button className="main-bedroom-button" onClick={handleButtonClick}>Return to Hall</button>
      </div>
    </div>
  );
}

export default MainBedroom;
