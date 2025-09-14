/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import Question from "./Question";
import he from "he";
export default function Quiz() {
  const [questionsArray, setQuestionsArray] = useState([]);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function fetchQuestions() {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=22&difficulty=easy&type=multiple"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);

        const arr = data.results.map((question, index) => {
          const options = [
            ...question.incorrect_answers,
            question.correct_answer,
          ].map((ele) => he.decode(ele));

          const randomOptions = shuffleArray(options);

          return {
            id: index,
            question: he.decode(question.question),
            options: randomOptions,
            selected: "",
            correctAnswer: question.correct_answer,
            displayAnswer: false,
          };
        });
        setQuestionsArray(arr);
        setLoading(false);
      });
  }

  useEffect(() => {
    if (questionsArray.length === 0) {
      fetchQuestions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const [quizQuestions, setQuizQuestions] = useState(props.questionsArray);

  const handleOptionSelect = (questionIndex, option) => {
    if (showCorrectAnswer) return; //to stop answers from being changed after results are shown

    setSelectedOptions((prevState) => ({
      ...prevState,
      [questionIndex]: option,
    }));

    if (option === questionsArray[questionIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleShowCorrectAnswer = () => {
    setShowCorrectAnswer(true);
    // setQuizCompleted(true);
  };
  const handlePlayAgain = () => {
    setShowCorrectAnswer(false);
    setSelectedOptions({});
    setScore(0);

    fetchQuestions();
  };

  const allQuestionsAnswered = questionsArray.every(
    (question, index) => selectedOptions[index] !== undefined
  );

  const questionElements = questionsArray.map((question, index) => (
    <Question
      key={index}
      question={question.question}
      options={question.options}
      correctAnswer={question.correctAnswer}
      selectedOption={selectedOptions[index]}
      showCorrectAnswer={showCorrectAnswer}
      onOptionSelect={(option) => handleOptionSelect(index, option)}
    />
  ));

  return (
    <>
      {loading ? (
        <h1 className="loading">Loading...</h1>
      ) : (
        <div className="wrapper">
          <div className="question-container">{questionElements}</div>
          {!showCorrectAnswer && (
            <button
              className="btn check-btn"
              onClick={handleShowCorrectAnswer}
              disabled={!allQuestionsAnswered}
            >
              Check Answers
            </button>
          )}
          {showCorrectAnswer && (
            <div className="score-btn">
              <span className="score">
                You scored {score}/{questionsArray.length} correct answers
              </span>
              <button className="btn check-btn" onClick={handlePlayAgain}>
                Play Again
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
