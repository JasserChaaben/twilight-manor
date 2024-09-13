import "./MainBedroom.css";
import React, { useEffect, useState } from "react";

function MainBedroom({ name, level, LevelUp }) {
  const [showPopup, setShowPopup] = useState(false);
  const handleButtonClick = () => {
    setShowPopup(true);
  };
  return (
    <div className="main-bedroom-container">
      <h1 className="main-bedroom-title">Main Bedroom</h1>
      {!showPopup && (
        <div className="main-bedroom-content">
          {level <= 6 ? (
            <h3>
              The Main Bedroom stretches out before {name}, its grandeur
              diminished by years of neglect. An ornate bed, draped with
              tattered curtains, dominates the room, its once-luxurious canopy
              now sagging. Heavy drapes block most of the light, casting the
              room in a dim, oppressive gloom. {name} notices an antique vanity
              cluttered with broken glass and faded trinkets, hinting at a past
              now forgotten. A grand wardrobe stands silently against the wall,
              its contents long lost to time. The floorboards creak underfoot,
              amplifying the eerie silence and suggesting that this room holds
              memories and secrets from the mansion’s dark past.
            </h3>
          ) : (
            <h3>
              In the dimly lit Main Bedroom, {name} uses the ornate brass key to
              unlock a large, dusty trunk at the foot of an old, ornate bed.
              Inside, {name} discovers a collection of old documents and
              photographs. Among these, a faded newspaper article reveals the
              chilling details of the murder of the heads of the Everly family,
              which occurred in this very room. Among the items, {name} also
              finds a slip of paper with the title of a book: “The Everly
              Family’s Dark Secrets.” The note suggests that this book may hold
              crucial information about the mansion’s mysteries and the treasure
              hunt.
            </h3>
          )}
          {level != 6 ? (
            <h4>Nothing is here</h4>
          ) : (
            <button className="kids-bedroom-button" onClick={handleButtonClick}>
              Look Around
            </button>
          )}
        </div>
      )}
      {showPopup && (
        <Objective
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

const Objective = ({ name, win, onClose }) => {
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  const quizQuestions = [
    // React.memo - Hard Interview Question
    {
      question:
        "How does React.memo optimize component rendering and what are its limitations?",
      options: [
        "React.memo prevents re-renders by comparing props. It’s useful for performance but can be complex and may not handle deep prop changes well.",
        "React.memo manages component state and lifecycle.",
        "React.memo is a library for memoizing components automatically.",
        "React.memo adds extra props without affecting rendering.",
      ],
      correctAnswer: 0,
    },
    // React.memo - Practical Coding Question
    {
      question:
        "How do you use React.memo to optimize a list component that only updates when item data changes?",
      options: [
        "Wrap the list item component with React.memo to prevent unnecessary re-renders.",
        "Wrap the entire app with React.memo to optimize performance.",
        "Apply React.memo only to the list's parent component.",
        "Use shouldComponentUpdate in the component to optimize rendering.",
      ],
      correctAnswer: 0,
    },
    // Toggles and Booleans - Practical Coding Question
    {
      question:
        "How can you implement a toggle switch in React to show or hide a component?",
      options: [
        "Use a boolean state to conditionally render the component.",
        "Use a CSS class to hide/show the component.",
        "Save the toggle state in local storage.",
        "Manipulate the DOM directly to show/hide the component.",
      ],
      correctAnswer: 0,
    },
    // Toggles and Booleans - Practical Coding Question
    {
      question:
        "How can you use a boolean state to enable or disable a button in React?",
      options: [
        "Use a boolean state to set the button’s disabled attribute.",
        "Use CSS to style the button as disabled.",
        "Create two buttons and toggle their visibility.",
        "Use inline JavaScript to disable the button based on the boolean value.",
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
        {showResults && score < 3 ? <h2>{name} Failed the quiz!</h2> : <></>}

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
export default MainBedroom;
