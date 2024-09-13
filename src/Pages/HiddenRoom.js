import "./HiddenRoom.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function HiddenRoom({ name, gender, level, LevelUp }) {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  return (
    <div className="hidden-room-container">
      <h1 className="hidden-room-title">Hidden Room</h1>
      {!showPopup && (
        <div className="hidden-room-content">
          {level <= 10 ? (
            <h3>
              The Hidden Room is cloaked in an unsettling quiet, its dark
              corners obscured by thick cobwebs. Dim light filters through the
              cracks in the walls, barely illuminating the dusty furniture
              scattered around. An old chest in the corner might hold hidden
              secrets, and strange markings on the walls hint at forgotten
              rituals. The air is dense with a musty smell, and a cold draft
              seems to whisper eerie tales of the mansion's past, beckoning{" "}
              {name} to uncover the mysteries within.
            </h3>
          ) : (
            <h3>
              In the dimly lit Hidden Room, {name} discovers the final clues
              needed to uncover the mansion’s secrets. The old chest reveals
              ancient manuscripts detailing the hidden history of the mansion
              and its occupants. The cryptic symbols on the walls start making
              sense, leading to the final location of the treasure.{" "}
              {gender === 0 ? "He" : "She"} finds the treasure hidden behind a
              false wall, confirming that the mansion’s dark past is finally
              unveiled. The journey comes to an end as {name} stands victorious
              in solving the mansion’s mystery.
            </h3>
          )}
          {level < 10 ? (
            <h4>There’s nothing here yet</h4>
          ) : level > 10 ? (
            <button
              className="hidden-room-button"
              onClick={() => navigate("/treasure")}
            >
              Find the Treasure
            </button>
          ) : (
            <button className="hidden-room-button" onClick={handleButtonClick}>
              Investigate
            </button>
          )}
        </div>
      )}
      {showPopup && (
        <Objective
          name={name}
          win={() => {
            setShowPopup(false);
            LevelUp();
            window.location.reload();
          }}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}

const Objective = ({ name, win, onClose }) => {
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  const quizQuestions = [
    // Define your quiz questions here
  ];

  // Shuffle function
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const scrambledQuestions = quizQuestions.map((question) => {
      const options = [...question.options];
      const correctAnswerText = options[question.correctAnswer];
      const shuffledOptions = shuffleArray(options);
      const newCorrectAnswerIndex = shuffledOptions.indexOf(correctAnswerText);

      return {
        question: question.question,
        options: shuffledOptions,
        correctAnswer: newCorrectAnswerIndex,
      };
    });

    setShuffledQuestions(scrambledQuestions);
  }, []);

  useEffect(() => {
    if (score === quizQuestions.length) {
      win();
    }
  }, [score]);

  const handleAnswerClick = (index) => {
    if (index === shuffledQuestions[quizIndex].correctAnswer) {
      setScore(score + 1);
    }
    if (quizIndex + 1 < shuffledQuestions.length) {
      setQuizIndex(quizIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {showResults && score < 3 ? <h2>{name} Failed the quiz!</h2> : <></>}

        {!showResults ? (
          <>
            <h3>{shuffledQuestions[quizIndex]?.question}</h3>
            <div className="button-grid">
              {shuffledQuestions[quizIndex]?.options.map((option, index) => (
                <button
                  key={index}
                  className="quiz-option-button"
                  onClick={() => handleAnswerClick(index)}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : score < quizQuestions.length ? (
          <div>
            <h3>
              Quiz Complete! You scored {score} out of{" "}
              {shuffledQuestions.length}.
            </h3>
          </div>
        ) : (
          <></>
        )}

        {showResults && score < quizQuestions.length ? (
          <button className="popup-close" onClick={onClose}>
            Go Back
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default HiddenRoom;
