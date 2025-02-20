import React from "react";

const Question = ({ question, options, selectedAnswer, onSelect }) => {
  return (
    <div className="question-card">
      <h3>{question}</h3>
      <div className="options">
        {options.map((option, index) => (
          <button
            key={index}
            className={`option ${selectedAnswer === option ? "selected" : ""}`}
            onClick={() => onSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
