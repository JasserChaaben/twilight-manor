import "./Library.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Library({ name, gender, level, LevelUp }) {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const handleButtonClick = () => {
    setShowPopup(true);
  };
  return (
    <div className="library-container">
      <h1 className="library-title">Library</h1>
      {!showPopup && (
        <div className="library-content">
          {level <= 7 ? (
            <h3>
              The library stretches out before {name}, its towering shelves
              lined with dust-covered books and yellowed pages left untouched
              for years. The room is cloaked in darkness, with only faint,
              filtered light sneaking through the cracks of heavy, drawn
              curtains. An antique desk, cluttered with old papers and notes,
              stands as a potential source of clues for the treasure hunt. The
              cold fireplace, flanked by faded armchairs, adds to the room’s
              eerie, forgotten atmosphere, suggesting hidden secrets yet to be
              unearthed.
            </h3>
          ) : (
            <h3>
              In the shadowy Library, {name} searches for the book titled “The
              Everly Family’s Dark Secrets” mentioned in the slip of paper found
              in the Main Bedroom. After a thorough search, {name} locates the
              book hidden among the dusty shelves. As{" "}
              {gender == 0 ? "he" : "she"} read through its pages, the book
              reveals the family's sordid history and dirty secrets, confirming
              that the treasure is concealed within the house. The book includes
              a detailed layout of the mansion, highlighting a hidden room
              concealed behind the library’s towering shelves. Following the
              book’s instructions, {name} discovers a secret passage behind the
              shelves, leading deeper into the mansion and bringing them closer
              to uncovering the treasure.
            </h3>
          )}
          {level < 7 ? (
            <h4>Nothing is here</h4>
          ) : level > 7 ? (
            <button
              className="library-button"
              onClick={() => navigate("/hiddenroom")}
            >
              Go To The Hidden Room
            </button>
          ) : (
            <button className="library-button" onClick={handleButtonClick}>
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
        "Explain the impact of lazy loading on web performance and SEO, and discuss the potential challenges and best practices for implementing it in a single-page application.",
      options: [
        "Lazy loading can significantly improve performance by deferring the loading of off-screen content, but it can also impact SEO if not implemented correctly. Best practices include using intersection observers and ensuring critical content is loaded early.",
        "Lazy loading increases page load time by loading all content simultaneously. It is best to avoid it in single-page applications.",
        "Lazy loading only affects performance and has no impact on SEO. It is primarily used to improve the user experience by loading images and videos as they come into view.",
        "Lazy loading should be avoided in modern web applications due to its complexity and potential negative impact on performance.",
      ],
      correctAnswer: 0,
    },
    {
      question:
        "In a React application, how would you implement lazy loading for images using React's `lazy` and `Suspense` components?",
      options: [
        "Use React's `lazy` to dynamically import image components and `Suspense` to show a placeholder while the image component is loading.",
        "Use a third-party library like `react-lazy-load` to handle lazy loading images and ensure proper component updates.",
        "Manually manage image loading using state and effects without using `lazy` and `Suspense`.",
        "Implement lazy loading by adding `loading='lazy'` attribute directly to image tags.",
      ],
      correctAnswer: 0,
    },
    {
      question:
        "How can keyframe animations be optimized for performance, and what are the trade-offs when using complex animations on large-scale web applications?",
      options: [
        "Optimizing keyframe animations involves reducing the number of keyframes, using hardware acceleration with `transform` and `opacity`, and minimizing layout thrashing. Trade-offs include increased complexity and potential higher initial development time.",
        "Keyframe animations cannot be optimized and should be avoided in large-scale applications. Use CSS transitions instead.",
        "Complex keyframe animations should be avoided entirely for better performance in large-scale applications.",
        "Keyframe animations should only be used in simple web applications with minimal animation needs.",
      ],
      correctAnswer: 0,
    },
    {
      question:
        "Write a CSS keyframe animation to create a smooth fade-in effect for an element over 3 seconds.",
      options: [
        "@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } .fade-in { animation: fadeIn 3s ease-in; }",
        "@keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } } .fade-in { animation: fadeIn 3s linear; }",
        "@keyframes fadeIn { 0% { opacity: 1; } 100% { opacity: 0; } } .fade-in { animation: fadeIn 3s ease-out; }",
        "@keyframes fadeIn { 0% { opacity: 1; } 100% { opacity: 1; } } .fade-in { animation: fadeIn 3s ease-in; }",
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
export default Library;
