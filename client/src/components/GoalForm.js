import React, { useState } from "react";

export const GoalForm = ({
  goals,
  setGoals,
  goal,
  editGoal,
  setShowGoalEditForm,
  setShowGoalForm,
}) => {
  const [goalsFormValues, setGoalsFormValues] = useState({
    title: goal ? goal.title : "",
    description: goal ? goal.description : "",
    status: goal ? goal.status : "",
    category: goal ? goal.category : "",
    target_date: goal ? goal.target_date : "",
  });

  const handleSubmitGoalForm = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (goal) {
        response = await fetch(`/goals/${goal.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(goalsFormValues),
        });
      } else {
        response = await fetch("http://127.0.0.1:5555/goals", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(goalsFormValues),
        });
      }

      if (!response.ok) {
        throw new Error(
          goal ? "Failed to update goal" : "Failed to create goal"
        );
      }

      const goalData = await response.json();
      if (goal) {
        editGoal(goalData);
        setShowGoalEditForm(false);
      } else {
        setGoals([...goals, goalData]);
        setShowGoalForm(false);
      }

      setGoalsFormValues({
        title: "",
        description: "",
        status: "",
        category: "",
        target_date: "",
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitGoalForm}>
        <h2>{goal ? "Edit Goal" : "Create a new goal"}</h2>
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
        <button type="submit">{goal ? "Save" : "Create Goal"}</button>
        {goal && (
          <button onClick={() => setShowGoalEditForm(false)}>Cancel</button>
        )}
      </form>
    </div>
  );
};

export default GoalForm;
