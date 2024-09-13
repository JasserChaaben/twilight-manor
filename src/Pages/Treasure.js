import "./Hall.css";
import React from "react";

function Treasure({ name }) {
  return (
    <div className="treasure-container">
      <h1 className="hall-title"> The END</h1>
      <div className="hall-content">
        <h3>
          As {name} opens the chest, they are dazzled by an enormous pile of
          gold coins, sparkling jewels, and valuable artifacts. Amidst the
          treasure, they find a faded map hinting at an even greater fortune.
          Opting for simplicity over greed, {name} discards the map, takes a
          generous amount of gold, and exits the hidden room, content with their
          spoils and ready to leave the mansion behind.
        </h3>
      </div>
    </div>
  );
}

export default Treasure;
