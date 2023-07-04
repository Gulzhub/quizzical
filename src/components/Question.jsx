/* eslint-disable react/prop-types */

export default function Question({
  question,
  options,
  correctAnswer,
  selectedOption,
  showCorrectAnswer,
  onOptionSelect,
}) {
  const handleOptionSelect = (option) => {
    onOptionSelect(option === selectedOption ? null : option);
  };

  const getOptionClass = (option) => {
    if (showCorrectAnswer) {
      if (option === correctAnswer) {
        return "correct";
      } else if (option === selectedOption) {
        return "incorrect";
      }
    }

    return selectedOption === option ? "clicked" : "";
  };

  return (
    <div className="question-element">
      <h3 className="question">{question}</h3>
      <div className="options-container">
        {options.map((option) => {
          return (
            <div
              className={`option ${getOptionClass(option)}`}
              key={option}
              onClick={() => handleOptionSelect(option)}
            >
              <p>{option}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
}
