import React, { useState, useEffect } from "react";

function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [targetDate, setTargetDate] = useState("");

  useEffect(() => {
    const fetchGoals = async () => {
      const response = await fetch("http://127.0.0.1:5555/goals");
      const goalsArray = await response.json();
      setGoals(goalsArray);
    };
    fetchGoals().catch(console.error);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`The title you entered was: ${title}`);
    console.log(`The description you entered was: ${description}`);
    console.log(`The status you entered was: ${status}`);
    console.log(`The target date you entered was: ${targetDate}`);
  };

  return (
    <div>
      <h1>Goals</h1>
      <ul className="goal-list">
        {goals.map((goal) => (
          <li key={goal.id}>
            {goal.title}, {goal.description},{goal.status}, {goal.target_date},{" "}
            {goal.category}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <h2>Create a new goal</h2>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Status
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </label>
        <label>
          Target Date
          <input
            type="text"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
          />
        </label>
        <button type="submit">Add Goal</button>
      </form>
    </div>
  );
}

export default GoalsPage;
