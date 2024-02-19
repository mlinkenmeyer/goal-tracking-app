import React, { useState } from "react";

export const GoalForm = ({ goals, setGoals }) => {
  const [goalsFormValues, setGoalsFormValues] = useState({
    title: "",
    description: "",
    status: "",
    category: "",
    target_date: "",
  });

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

      const newGoal = await response.json();
      console.log(goals);

      setGoals([...goals, newGoal]);

      setGoalsFormValues({
        title: "",
        description: "",
        status: "",
        category: "",
        target_date: "",
      });
    } catch (error) {
      console.error("Error creating goal:", error.message);
    }
  };

  return (
    <div>
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
};

export default GoalForm;
