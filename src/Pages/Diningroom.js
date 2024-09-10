import React from 'react';
    import './Diningroom.css';

function DiningRoom({name,level}) {
  return (
    <div className="diningroom-container">
      <h1 className="diningroom-title">Dining Room</h1>
      <div className="diningroom-content">
        <h3>The dining room is a grand chamber of shadowy opulence. A long, dust-covered table stretches out, its surface glinting with the remains of long-abandoned settings. Dark, heavy drapes hang over tall windows, and a grand chandelier hangs low, casting ghostly patterns across the walls. {name} senses the echoes of past gatherings, each corner steeped in a silent, spectral grandeur.</h3>
        {level<2?<h4>Nothing is here</h4>:<button className="diningroom-button">Second Floor</button>}
      </div>
    </div>
  );
}

export default DiningRoom;
