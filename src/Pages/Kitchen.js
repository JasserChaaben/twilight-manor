
import './Kitchen.css';
import React, { useEffect, useState } from 'react';

function Kitchen({name,level,LevelUp}) {
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    
    setShowPopup(true);
  };
  return (
    <div className="kitchen-container">
      <h1 className="kitchen-title">Kitchen</h1>
      {!showPopup &&  <div className="kitchen-content">
        {level<=2?<h3>The kitchen is a labyrinth of old-world charm, shrouded in an eerie quiet. Dust-covered shelves groan under the weight of aged crockery, and a large iron stove stands sentinel in the corner. Flickering shadows dance across the worn, tiled floor as if the room itself holds secrets of meals long forgotten. {name} feels a chill, as if the very walls are whispering tales of culinary mysteries and ghostly feasts.</h3>
        :<h3>As {name} searches through the kitchen, they notice a strange, dusty cookbook left open on the counter. The pages are worn, and one passage is underlined in dark ink:

        "The feast was never finished... It waits where the table is set."
        
        Flipping the page reveals an old diagram of the mansion’s dining room. A small sketch marks a specific spot on the table. The message is clear—something important remains there, waiting to be found.
        </h3> }
        {level!=2?<h4>Nothing is here</h4>:<button className="diningroom-button" onClick={handleButtonClick}>Look Around</button>}
      </div>}

      
      {showPopup && <FirstTest name={name} win={() => {setShowPopup(false);console.log("win");LevelUp(); window. location.reload();}} onClose={() => setShowPopup(false)} />}
    </div>
  );
}
const FirstTest = ({ name,win, onClose }) => {
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  const quizQuestions = [
    {
      question: "What is the main purpose of React?",
      options: ["To build user interfaces", "To manage databases", "To style web pages", "To perform server-side rendering"],
      correctAnswer: 0
    },
    {
      question: "What is a React Hook?",
      options: ["A special function to use state and lifecycle", "A tool for making HTTP requests", "A way to style components", "A type of React component"],
      correctAnswer: 0
    },
    {
      question: "What is JSX?",
      options: ["A JavaScript extension for writing HTML", "A CSS-in-JS library", "A package manager", "A type of React component"],
      correctAnswer: 0
    }
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
        correctAnswer: newCorrectAnswerIndex
      };
    });

    setShuffledQuestions(scrambledQuestions);
  }, []);
  useEffect(() => {
    console.log(score)
    if(score==3)
    {
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
    {showResults&&score<3?  <h2>{name} Failed the quiz!</h2>:<></>}
      
      {!showResults?  (
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
      ) : score<3? (
        <div>
          <h3>Quiz Complete! You scored {score} out of {shuffledQuestions.length}.</h3>
        </div>
      ):<></>}

      {showResults&&score<3?<button className="popup-close" onClick={onClose}>Go Back</button>:<></>}
    </div>
  </div>
  );
};

export default Kitchen;
