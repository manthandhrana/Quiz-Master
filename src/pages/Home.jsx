import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css"

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to the Interactive Quiz Platform 🎉</h1>
      <p>Test your knowledge and track your progress!</p>
      <button onClick={() => navigate("/quiz")} className="start-quiz-btn">
        Start Quiz 🚀
      </button>
    </div>
  );
};

export default Home;
