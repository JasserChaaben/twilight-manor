import './Library.css';
import React, { useState } from 'react';

function Library({  name, level, LevelUp }) {

  const handleButtonClick = () => {
  };

  return (
    <div className="library-container">
      <h1 className="library-title">Library</h1>
      <div className="library-content">
        <h3>
        The library stretches out before {name}, its towering shelves lined with dust-covered books and yellowed pages left untouched for years. The room is cloaked in darkness, with only faint, filtered light sneaking through the cracks of heavy, drawn curtains. An antique desk, cluttered with old papers and notes, stands as a potential source of clues for the treasure hunt. The cold fireplace, flanked by faded armchairs, adds to the room’s eerie, forgotten atmosphere, suggesting hidden secrets yet to be unearthed.

        </h3>
        {level!=7?<h4>Nothing is here</h4>:<button className="library-button" onClick={handleButtonClick}>Look Around</button>}
      </div>
    </div>
  );
}

export default Library;
