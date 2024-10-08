import "./Hall.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Hall({ goToSecondFloor, name, level, LevelUp }) {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const handleButtonClick = () => {
    if (level < 2) {
      LevelUp();
    }
    if (level < 5) setShowPopup(true);
    else {
      goToSecondFloor();
      navigate("/hallway");
      window.location.reload();
    }
  };
  return (
    <div className="hall-container">
      <h1 className="hall-title"> Hall</h1>
      <div className="hall-content">
        <h3>
          The grand manor hall exudes an air of enigmatic allure, bathed in
          shadowy twilight. Ornate chandeliers cast fleeting glimmers across the
          dark, carved walls. Heavy velvet curtains frame tall, arched windows,
          and an ancient staircase spirals into darkness. {name} senses a weight
          of untold secrets and hidden whispers in the still, musty air.
        </h3>
        <button className="hall-button" onClick={handleButtonClick}>
          Go To Second Floor
        </button>
      </div>

      {showPopup && level < 3 ? (
        <FirstObs name={name} onClose={() => setShowPopup(false)} />
      ) : (
        showPopup && (
          <SecondObs name={name} onClose={() => setShowPopup(false)} />
        )
      )}
    </div>
  );
}

const FirstObs = ({ name, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>
          As {name} reaches for the staircase, a heavy, unseen force slams an
          iron gate across the stairs with a sharp clang. A chilling voice
          echoes from above:
        </p>
        <p>
          "The second floor is locked... You must first uncover the secret in
          the kitchen. Only then will the way open."
        </p>
        <p>The gate remains sealed, its cold metal unyielding.</p>
        <button className="popup-close" onClick={onClose}>
          Go Back
        </button>
      </div>
    </div>
  );
};
const SecondObs = ({ name, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>
          As {name} tries to push past the iron gate, a low, resonant hum
          emanates from the barrier, reinforcing its seal. A chilling reminder
          echoes:
        </p>
        <p>
          "The gate remains steadfast. The path to the second floor is still
          barred. Continue your search and uncover the secrets hidden in the
          kitchen, dining room, and living room to reveal the way forward."
        </p>
        <button className="popup-close" onClick={onClose}>
          Go Back
        </button>
      </div>
    </div>
  );
};
export default Hall;
