import React from 'react';
import './Livingroom.css';

function LivingRoom({name,level}) {
  return (
    <div className="livingroom-container">
      <h1 className="livingroom-title">Living Room</h1>
      <div className="livingroom-content">
        <h3>The living room, draped in a veil of twilight, exudes an unsettling calm. Faded, threadbare sofas face a cold, empty fireplace, while dusty portraits seem to watch with unseen eyes. The heavy air is filled with the faint creak of old wooden floorboards, and the faint scent of aged leather lingers. {name} feels a shiver as if the room holds memories of ghostly conversations and untold stories.</h3>
        {level<4?<h4>Nothing is here</h4>:<button className="diningroom-button">Second Floor</button>}
      </div>
    </div>
  );
}

export default LivingRoom;
