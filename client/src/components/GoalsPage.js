import React, { useState, useEffect } from "react";
import Goal from "./Goal";

function GoalsPage() {
  const [goals, setGoals] = useState([]);

  const [goalsFormValues, setGoalsFormValues] = useState({
    title: "",
    description: "",
    status: "",
    targetDate: "",
  });

  useEffect(() => {
    const fetchGoals = async () => {
      const response = await fetch("http://127.0.0.1:5555/goals");
      const goalsArray = await response.json();
      setGoals(goalsArray);
    };
    fetchGoals().catch(console.error);
  }, []);

  let goalsList = goals.map((goal) => <Goal key={goal.id} goal={goal} />);

  const handleSubmit = (e) => {
    e.preventDefault();
    setGoals([...goals, goalsFormValues]);
    setGoalsFormValues({
      title: "",
      description: "",
      status: "",
      targetDate: "",
    });
    console.log(`The title you entered was: ${goalsFormValues.title}`);
    console.log(
      `The description you entered was: ${goalsFormValues.description}`
    );
    console.log(`The status you entered was: ${goalsFormValues.status}`);
    console.log(
      `The target date you entered was: ${goalsFormValues.targetDate}`
    );
  };

  return (
    <div>
      <h1>Goals</h1>
      {goalsList}
      <form onSubmit={handleSubmit}>
        <h2>Create a new goal</h2>
        <label>
          Title
          <input
            type="text"
            value={goalsFormValues.title}
            onChange={(e) =>
              setGoalsFormValues({ ...goalsFormValues, title: e.target.value })
            }
          />
        </label>
        <br />
        <label>
          Description
          <input
            type="text"
            value={goalsFormValues.description}
            onChange={(e) =>
              setGoalsFormValues({
                ...goalsFormValues,
                description: e.target.value,
              })
            }
          />
        </label>
        <br />
        <label>
          Status
          <input
            type="text"
            value={goalsFormValues.status}
            onChange={(e) =>
              setGoalsFormValues({ ...goalsFormValues, status: e.target.value })
            }
          />
        </label>
        <br />
        <label>
          Target Date
          <input
            type="text"
            value={goalsFormValues.targetDate}
            onChange={(e) =>
              setGoalsFormValues({
                ...goalsFormValues,
                targetDate: e.target.value,
              })
            }
          />
        </label>
        <br />
        <button type="submit">Add Goal</button>
      </form>
    </div>
  );
}

export default GoalsPage;
