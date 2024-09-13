import "./Diningroom.css";

import React, { useEffect, useState } from "react";

function DiningRoom({ name, level, LevelUp }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
  };
  return (
    <div className="diningroom-container">
      <h1 className="diningroom-title">Dining Room</h1>
      {!showPopup && (
        <div className="diningroom-content">
          {level <= 3 ? (
            <h3>
              The dining room is a grand chamber of shadowy opulence. A long,
              dust-covered table stretches out, its surface glinting with the
              remains of long-abandoned settings. Dark, heavy drapes hang over
              tall windows, and a grand chandelier hangs low, casting ghostly
              patterns across the walls. {name} senses the echoes of past
              gatherings, each corner steeped in a silent, spectral grandeur.
            </h3>
          ) : (
            <h3>
              In the dining room, after examining the marked spot on the table,{" "}
              {name} uncovers a hidden compartment. Inside, they find an old
              envelope with a note that reads: "Where the warmth of past
              conversations once lingered, search near the source." The note is
              accompanied by a sketch of the living room with a prominent
              fireplace. The clue indicates that something important is hidden
              near the fireplace in the living room.
            </h3>
          )}
          {level != 3 ? (
            <h4>Nothing is here</h4>
          ) : (
            <button className="diningroom-button" onClick={handleButtonClick}>
              Look Around
            </button>
          )}
        </div>
      )}
      {showPopup && (
        <FirstTest
          name={name}
          win={() => {
            setShowPopup(false);
            console.log("win");
            LevelUp();
            window.location.reload();
          }}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}
const FirstTest = ({ name, win, onClose }) => {
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  const quizQuestions = [
    {
      question:
        "What does the empty dependency array in useEffect([]) indicate?",
      options: [
        "The effect runs only once, after the initial render",
        "The effect runs after every render",
        "The effect runs before the initial render",
        "The effect runs only if the component is unmounted",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is the correct way to cleanup side effects in useEffect?",
      options: [
        "Return a function inside useEffect",
        "Call useEffect again manually",
        "Use setState to reset the effect",
        "Declare another useEffect to handle cleanup",
      ],
      correctAnswer: 0,
    },
    {
      question:
        "Why would you pass a function or a variable as a dependency in the dependency array of useEffect?",
      options: [
        "To ensure useEffect reruns when that value changes",
        "To ensure useEffect never reruns",
        "To improve performance by memoizing values",
        "To prevent the component from re-rendering",
      ],
      correctAnswer: 0,
    },
    {
      question: "What happens if you omit the dependency array in useEffect?",
      options: [
        "The effect runs after every render",
        "The effect runs only on initial render",
        "The effect does not run at all",
        "The effect only runs when state changes",
      ],
      correctAnswer: 0,
    },
  ];

  // Fisher-Yates shuffle algorithm to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Scramble the options and keep track of the correct answer
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
    console.log(score);
    if (score == 4) {
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
        {showResults && score < 4 ? <h2>{name} Failed the quiz!</h2> : <></>}

        {!showResults ? (
          <>
            <h3>{shuffledQuestions[quizIndex]?.question}</h3>
            <div className="button-grid">
              {shuffledQuestions[quizIndex]?.options.map((option, index) => (
                <button
                  key={index}
                  className="quiz-option-button"
                  id={`quiz-button-${index}`}
                  onClick={() => handleAnswerClick(index)}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : score < 4 ? (
          <div>
            <h3>
              Quiz Complete! You scored {score} out of{" "}
              {shuffledQuestions.length}.
            </h3>
          </div>
        ) : (
          <></>
        )}

        {showResults && score < 4 ? (
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
export default DiningRoom;
