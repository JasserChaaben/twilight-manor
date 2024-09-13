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
              Inside, {name} finds a collection of old documents and
              photographs, including a faded newspaper article that reveals the
              chilling details of the murder of the heads of the Everly family,
              which occurred in this very room. Among the items is an old,
              leather-bound book titled “The Everly Family’s Dark Secrets.” The
              book stands out with its mysterious title, suggesting it could
              hold significant information for {name} as they continue their
              quest through the mansion.
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
