import "./KidsBedroom.css";
import React, { useEffect, useState } from "react";

function KidsBedroom({ name, gender, level, LevelUp }) {
  const [showPopup, setShowPopup] = useState(false);
  const handleButtonClick = () => {
    setShowPopup(true);
  };

  return (
    <div className="kids-bedroom-container">
      <h1 className="kids-bedroom-title">Kids Bedroom</h1>
      {!showPopup && (
        <div className="kids-bedroom-content">
          {level <= 5 ? (
            <h3>
              The Kids' Bedroom opens before {name}, revealing a scene of
              poignant abandonment. Once vibrant and lively, the room is now a
              ghostly reflection of its past. A small, ornate bed with a frayed,
              dusty canopy sits against the wall, surrounded by faded wallpaper
              with childish patterns. {name} notices old toys scattered across
              the floor, each covered in a thick layer of dust. A small, cracked
              window lets in only a sliver of light, casting long, eerie
              shadows. In one corner, an old rocking chair, worn and creaky,
              stands silently. As {name} surveys the room, a faint feeling of
              anticipation grows, as if something important lies hidden beneath
              the surface of this seemingly forgotten space, waiting to be
              discovered amidst the silent remnants of a lost childhood.
            </h3>
          ) : (
            <h3>
              As {name} searches through the dimly lit Kids' Bedroom,{" "}
              {gender == 0 ? "he " : "she "}
              discover a small, ornate wooden box hidden beneath the bed. The
              box, dust-covered and aged, reveals a tarnished brass key with
              intricate designs when opened. The key feels weighty and
              significant, as if it holds the promise of unlocking something
              crucial. The discovery of this key suggests that there is an
              important mechanism or door elsewhere in the mansion that it might
              open, pushing {name} to explore further and delve deeper into the
              mansion's secrets.{" "}
            </h3>
          )}{" "}
          {level != 5 ? (
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
    {
      question:
        "Explain the CSS BEM (Block Element Modifier) methodology and how it helps in maintaining large projects.",
      options: [
        "It provides a naming convention that keeps CSS modular and reusable",
        "It helps avoid CSS specificity issues by using a nested structure",
        "It’s a CSS framework for grid layouts",
        "It allows the use of variables and mixins in CSS",
      ],
      correctAnswer: 0,
    },
    {
      question:
        "In Node.js, how would you handle a memory leak in a production environment?",
      options: [
        "Use memory profiling tools to identify and fix the leak",
        "Increase the available memory on the server",
        "Use the Node.js cluster module",
        "Switch to a different runtime like Deno",
      ],
      correctAnswer: 0,
    },
    {
      question:
        "How does CSS Grid differ from Flexbox, and when would you choose one over the other?",
      options: [
        "Grid is for 2D layouts, while Flexbox is for 1D layouts",
        "Flexbox supports responsive design, while Grid does not",
        "Grid offers better browser support than Flexbox",
        "Flexbox is faster in performance than Grid",
      ],
      correctAnswer: 0,
    },
    {
      question:
        "What are streams in Node.js, and how can they improve the performance of large file uploads?",
      options: [
        "Streams allow handling of data in chunks, improving memory efficiency",
        "Streams are used to cache file uploads for faster access",
        "Streams allow concurrent file uploads",
        "Streams compress the data before uploading to reduce file size",
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

export default KidsBedroom;
