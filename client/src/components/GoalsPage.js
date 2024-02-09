import React, { useState, useEffect } from "react";
import Goal from "./Goal";

function GoalsPage() {
  const [goals, setGoals] = useState([]);

  const [goalsFormValues, setGoalsFormValues] = useState({
    title: "",
    description: "",
    status: "",
    category: "",
    target_date: "",
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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setGoals([...goals, goalsFormValues]);
  //   setGoalsFormValues({
  //     title: "",
  //     description: "",
  //     status: "",
  //     targetDate: "",
  //   });
  //   console.log(`The title you entered was: ${goalsFormValues.title}`);
  //   console.log(
  //     `The description you entered was: ${goalsFormValues.description}`
  //   );
  //   console.log(`The status you entered was: ${goalsFormValues.status}`);
  //   console.log(
  //     `The target date you entered was: ${goalsFormValues.targetDate}`
  //   );
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5555/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(goalsFormValues),
      });

      if (!response.ok) {
        throw new Error("Failed to create goal");
      }

      const createdGoal = await response.json();

      setGoals([...goals, createdGoal]);

      setGoalsFormValues({
        title: "",
        description: "",
        status: "",
        target_date: "",
      });
    } catch (error) {
      console.error("Error creating goal:", error.message);
    }
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
          Category
          <input
            type="text"
            value={goalsFormValues.category}
            onChange={(e) =>
              setGoalsFormValues({
                ...goalsFormValues,
                category: e.target.value,
              })
            }
          />
        </label>
        <br />
        <label></label>
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
            value={goalsFormValues.target_date}
            onChange={(e) =>
              setGoalsFormValues({
                ...goalsFormValues,
                target_date: e.target.value,
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
