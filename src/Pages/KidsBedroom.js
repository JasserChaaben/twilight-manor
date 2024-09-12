import './KidsBedroom.css';
import React from 'react';

function KidsBedroom({  name ,level, LevelUp }) {

  const handleButtonClick = () => {
  };

  return (
    <div className="kids-bedroom-container">
      <h1 className="kids-bedroom-title">Kids Bedroom</h1>
      <div className="kids-bedroom-content">
        <h3>
        The Kids' Bedroom opens before {name}, revealing a scene of poignant abandonment. Once vibrant and lively, the room is now a ghostly reflection of its past. A small, ornate bed with a frayed, dusty canopy sits against the wall, surrounded by faded wallpaper with childish patterns. {name} notices old toys scattered across the floor, each covered in a thick layer of dust. A small, cracked window lets in only a sliver of light, casting long, eerie shadows. In one corner, an old rocking chair, worn and creaky, stands silently. As {name} surveys the room, a faint feeling of anticipation grows, as if something important lies hidden beneath the surface of this seemingly forgotten space, waiting to be discovered amidst the silent remnants of a lost childhood.</h3>
        <button className="kids-bedroom-button" onClick={handleButtonClick}>Return to Hall</button>
      </div>
    </div>
  );
}

export default KidsBedroom;
