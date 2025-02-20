import React, { createContext, useState } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [attempts, setAttempts] = useState([]);

  const saveAttempt = (score) => {
    const lastAttempt = attempts.length > 0 ? attempts[attempts.length - 1] : null;
    let improvement = null;

    if (lastAttempt) {
      const diff = score - lastAttempt.score;
      improvement = diff === 0 ? 0 : ((diff / lastAttempt.score) * 100).toFixed(2);
    }

    setAttempts([...attempts, { score, improvement }]);
  };

  return (
    <QuizContext.Provider value={{ attempts, saveAttempt }}>
      {children}
    </QuizContext.Provider>
  );
};
