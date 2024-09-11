
import React, { useEffect, useState } from 'react';
import './Livingroom.css';

function LivingRoom({name,level,LevelUp}) {
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    
    setShowPopup(true);
  };
  return (
    <div className="livingroom-container">
      <h1 className="livingroom-title">Living Room</h1>
      {!showPopup && <div className="livingroom-content">
      {level<=4?  <h3>The living room, draped in a veil of twilight, exudes an unsettling calm. Faded, threadbare sofas face a cold, empty fireplace, while dusty portraits seem to watch with unseen eyes. The heavy air is filled with the faint creak of old wooden floorboards, and the faint scent of aged leather lingers. {name} feels a shiver as if the room holds memories of ghostly conversations and untold stories.</h3>
        :<h3>Upon examining the fireplace in the living room, {name} discovers a small, concealed drawer behind the hearth. Inside, they find an ornate key, its intricate design matching the symbol seen on the iron gate.

        With the key in hand, {name} returns to the hall. The heavy iron gate now clicks open smoothly as the key turns in the lock. The path to the second floor is finally revealed, and the way forward is clear.
        </h3>
             
          } {level!=4?<h4>Nothing is here</h4>:<button className="diningroom-button" onClick={handleButtonClick}>Look Around</button>}
      </div>
      }
      {showPopup && <FirstTest name={name} win={() => {setShowPopup(false);console.log("win");LevelUp() ;window.location.reload();}} onClose={() => setShowPopup(false)} />}
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
      question: "How do you use useEffect to perform a side effect only when a specific prop changes?",
      options: [
        "Pass the prop in the dependency array of useEffect",
        "Call useEffect inside an if statement that checks the prop",
        "Use a separate useEffect for each prop",
        "Directly call the prop's setter function inside useEffect"
      ],
      correctAnswer: 0
    },
    {
      question: "What is the syntax for using useEffect to run code both after the initial render and on every update?",
      options: [
        "useEffect(() => { /* code */ })",
        "useEffect(() => { /* code */ }, [])",
        "useEffect(() => { /* code */ }, [/* dependencies */])",
        "useEffect(() => { /* code */ }, [null])"
      ],
      correctAnswer: 0
    },
    {
      question: "How would you use useEffect to debounce a function call based on user input?",
      options: [
        "Use useEffect to set a timeout and clear it on each render",
        "Call the debounced function directly inside useEffect",
        "Pass the debounced function as a dependency in useEffect",
        "Use useEffect to reset the input value after every change"
      ],
      correctAnswer: 0
    },
    {
      question: "What is the correct way to handle asynchronous code within useEffect?",
      options: [
        "Use an inner async function and call it within useEffect",
        "Directly use async/await inside useEffect",
        "Return a promise from useEffect",
        "Use useEffect in combination with a callback pattern"
      ],
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
    if(score==4)
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
      ) : score<4? (
        <div>
          <h3>Quiz Complete! You scored {score} out of {shuffledQuestions.length}.</h3>
        </div>
      ):<></>}

      {showResults&&score<4?<button className="popup-close" onClick={onClose}>Go Back</button>:<></>}
    </div>
  </div>
  );
};
export default LivingRoom;
