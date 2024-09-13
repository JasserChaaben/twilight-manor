import "./HiddenRoom.css";
import React, { useEffect, useState } from "react";
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
          {level <= 8 ? (
            <h3>
              As {name} emerges from the secret passage, they enter the hidden
              treasure room, bathed in the eerie glow of flickering lights that
              have inexplicably remained functional despite years of
              abandonment. The lights cast unsettling shadows across the room,
              adding to its foreboding atmosphere. In the center of the room
              lies an ornate treasure chest, its intricate carvings and
              tarnished gold hinting at the riches within. Nearby, a skeletal
              remains of a long-dead figure lies on the floor, its bony hand
              reaching towards the chest as if in a final, desperate grasp. The
              air is heavy with the weight of lost time and unfulfilled
              promises, as {name} stands before the chest, ready to uncover the
              long-hidden treasure and confront the chilling remnants of the
              past.
            </h3>
          ) : (
            <h3>
              In the dimly lit Hidden Room, {name} cautiously steps forward,
              their eyes scanning the unsettling scene illuminated by the
              flickering lights. The skeletal remains on the floor catch their
              attention, and as {name} examines the bones more closely,{" "}
              {gender === 0 ? "He" : "She"} realize that the skeleton belongs to
              the older son of the family head. The realization adds a layer of
              grim history to the room’s already eerie atmosphere. To ensure the
              room’s safety, {name} carefully checks the surroundings for any
              hidden traps or mechanisms that might have been set to protect the
              treasure. {gender === 0 ? "He" : "She"} methodically inspect the
              walls and floor, {gender === 0 ? "His" : "her"} movements
              deliberate and cautious as they search for any signs of danger.
              Confident that the room is secure, {name} turns their focus to the
              ornate treasure chest at the center of the room. With a mixture of
              anticipation and resolve, {gender === 0 ? "He" : "She"} prepare to
              unlock the chest, ready to unveil the final secrets of the mansion
              and complete their journey.
            </h3>
          )}
          {level < 8 ? (
            <h4>You shouldn't be here yet!!</h4>
          ) : level > 8 ? (
            <button
              className="hidden-room-button"
              onClick={() => navigate("/treasure")}
            >
              Open the Treasure
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
    {
      question:
        "How would you manage state in a large React application where different components need to share and update the same state?",
      options: [
        "Use a state management library like Redux or Context API to centralize and manage state.",
        "Pass state down through props to every component that needs it.",
        "Manage state locally in each component and sync them manually.",
        "Use global variables to store and access state across components.",
      ],
      correctAnswer: 0,
    },
    {
      question:
        "How would you debounce a function in JavaScript to prevent it from being called too frequently in response to user input?",
      options: [
        "Use a debounce function that delays the execution until a specified amount of time has passed since the last call.",
        "Use setTimeout directly in the function to manage the delay.",
        "Call the function only once on initial user input and ignore subsequent calls.",
        "Use a timer to limit the number of times the function can be called.",
      ],
      correctAnswer: 0,
    },
    {
      question:
        "How can you ensure a responsive layout adjusts properly across different screen sizes without using media queries?",
      options: [
        "Use flexible units like percentages, viewport units, and CSS Grid to create a responsive layout.",
        "Apply fixed pixel values to elements and rely on browser zoom for responsiveness.",
        "Use JavaScript to dynamically adjust styles based on screen size.",
        "Use CSS frameworks that come with built-in responsive designs.",
      ],
      correctAnswer: 0,
    },
    {
      question:
        "How would you optimize a React component that renders a large list of items for better performance?",
      options: [
        "Use virtualization libraries like react-window to render only visible items.",
        "Increase the size of the list container to avoid performance issues.",
        "Render the entire list at once but use CSS to hide non-visible items.",
        "Apply memoization only to the list's parent component.",
      ],
      correctAnswer: 0,
    },
    {
      question:
        "How would you animate an element's height in CSS to smoothly transition between a collapsed and expanded state?",
      options: [
        "Use CSS transitions with a fixed height and transition the max-height property.",
        "Use JavaScript to manually adjust the height and apply CSS transitions.",
        "Set the height to auto and use keyframe animations.",
        "Apply a fixed height and animate opacity instead.",
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
    if (score == 5) {
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
        {showResults && score < 5 ? <h2>{name} Failed the quiz!</h2> : <></>}

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
        ) : score < 5 ? (
          <div>
            <h3>
              Quiz Complete! You scored {score} out of{" "}
              {shuffledQuestions.length}.
            </h3>
          </div>
        ) : (
          <></>
        )}

        {showResults && score < 5 ? (
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
