import React from 'react';
import './Kitchen.css';

function Kitchen() {
  return (
    <div className="kitchen-container">
      <h1 className="kitchen-title">Kitchen</h1>
      <div className="kitchen-content">
        <h3>The kitchen is a labyrinth of old-world charm, shrouded in an eerie quiet. Dust-covered shelves groan under the weight of aged crockery, and a large iron stove stands sentinel in the corner. Flickering shadows dance across the worn, tiled floor as if the room itself holds secrets of meals long forgotten. --Name-- feels a chill, as if the very walls are whispering tales of culinary mysteries and ghostly feasts.</h3>
        <button className="kitchen-button">Second Floor</button>
      </div>
    </div>
  );
}

export default Kitchen;
