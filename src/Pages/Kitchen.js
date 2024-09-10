import React from 'react';
import './Kitchen.css';

function Kitchen({name,level}) {
  return (
    <div className="kitchen-container">
      <h1 className="kitchen-title">Kitchen</h1>
      <div className="kitchen-content">
        <h3>The kitchen is a labyrinth of old-world charm, shrouded in an eerie quiet. Dust-covered shelves groan under the weight of aged crockery, and a large iron stove stands sentinel in the corner. Flickering shadows dance across the worn, tiled floor as if the room itself holds secrets of meals long forgotten. {name} feels a chill, as if the very walls are whispering tales of culinary mysteries and ghostly feasts.</h3>
        {level<2?<h4>Nothing is here</h4>:<button className="diningroom-button">Look Around</button>}
      </div>
    </div>
  );
}

export default Kitchen;
