import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../context/QuizContext";
import { saveAttemptToDB } from "../db/IndexDb"; // Import IndexedDB function
import Question from "../components/Question";
import Timer from "../components/Timer";
import "../styles/quiz.css";

const quizData = [
  { question: "Which planet is closest to the Sun?", options: ["Venus", "Mercury", "Earth", "Mars"], answer: "Mercury", type: "mcq" },
  { question: "Which data structure organizes items in FIFO?", options: ["Stack", "Queue", "Tree", "Graph"], answer: "Queue", type: "mcq" },
  { question: "Which is primarily used for structuring web pages?", options: ["Python", "Java", "HTML", "C++"], answer: "HTML", type: "mcq" },
  { question: "Which chemical symbol stands for Gold?", options: ["Au", "Gd", "Ag", "Pt"], answer: "Au", type: "mcq" },
  { question: "Which process is not typically involved in refining petroleum?", options: ["Fractional distillation", "Cracking", "Polymerization", "Filtration"], answer: "Filtration", type: "mcq" },
  { question: "What is the value of 12 + 28?", answer: "40", type: "integer" },
  { question: "How many states are there in the United States?", answer: "50", type: "integer" },
  { question: "In which year was the Declaration of Independence signed?", answer: "1776", type: "integer" },
  { question: "What is the value of pi rounded to the nearest integer?", answer: "3", type: "integer" },
  { question: "If a car travels at 60 mph for 2 hours, how many miles does it travel?", answer: "120", type: "integer" },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userInput, setUserInput] = useState(""); 
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const navigate = useNavigate();

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    if (answer === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleIntegerSubmit = () => {
    if (userInput.trim() !== "" && userInput === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }
    setUserInput("");
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizEnded(true);
    }
  };

  const handleSubmit = async () => {
    await saveAttemptToDB(score); // Save score in IndexedDB
    navigate("/dashboard");
  };

  return (
    <div className="quiz-container">
      {!quizEnded ? (
        <>
          <Timer duration={30} onTimeUp={handleNextQuestion} />
          {quizData[currentQuestion].type === "mcq" ? (
            <>
              <Question question={quizData[currentQuestion].question} options={quizData[currentQuestion].options} selectedAnswer={selectedAnswer} onSelect={handleAnswerSelect} />
              <button onClick={handleNextQuestion} disabled={!selectedAnswer}>Next</button>
            </>
          ) : (
            <>
              <h2>{quizData[currentQuestion].question}</h2>
              <input type="number" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Enter your answer" />
              <button onClick={handleIntegerSubmit} disabled={userInput.trim() === ""}>Submit Answer</button>
            </>
          )}
        </>
      ) : (
        <button onClick={handleSubmit} className="submit-btn">Submit & View Results 🚀</button>
      )}
    </div>
  );
};

export default Quiz;
