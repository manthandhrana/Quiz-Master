import React, { useEffect, useState } from "react";
import { getAttemptsFromDB } from "../db/IndexDb"; // Import function to fetch from IndexedDB
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    const fetchAttempts = async () => {
      const storedAttempts = await getAttemptsFromDB();
      setAttempts(storedAttempts);
    };
    fetchAttempts();
  }, []);

  const calculateImprovement = (current, previous) => {
    if (previous === 0) return "N/A";
    let improvement = ((current - previous) / previous) * 100;
    return improvement < 0 || !isFinite(improvement) ? "None" : `${Math.min(100, improvement.toFixed(2))}%`;
  };

  return (
    <div className="dashboard-container">
      <h1>Quiz Dashboard</h1>
      {attempts.length === 0 ? (
        <p>No attempts yet! <Link to="/quiz">Take a quiz now</Link>.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Attempt</th>
              <th>Score</th>
              <th>Improvement</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((attempt, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{attempt.score}/10</td>
                <td>{index === 0 ? "N/A" : calculateImprovement(attempt.score, attempts[index - 1].score)}</td>
                <td>{new Date(attempt.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link to="/quiz" className="reattempt-btn"> Reattempt Quiz</Link>
    </div>
  );
};

export default Dashboard;
