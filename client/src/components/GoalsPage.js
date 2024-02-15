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

  // function handleDeleteGoal(id) {
  //   console.log(`Deleting goal with id: ${id}`);
  //   fetch(`/goals/${id}`, { method: "DELETE" })
  //     .then((response) => {
  //       console.log("Response status:", response.status);
  //       if (response.ok) {
  //         console.log("Response is ok");
  //         setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
  //       } else {
  //         console.error("Failed to delete goal");
  //         throw new Error("Failed to delete goal");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting goal:", error);
  //     });
  // }

  const deleteGoal = (deleteGoal) => {
    const updatedGoals = goals.filter((goal) => goal.id !== deleteGoal.id);
    setGoals(updatedGoals);
  };

  const goalsList = goals.map((goal) => (
    <Goal
      key={goal.id}
      goal={goal}
      title={goal.title}
      description={goal.description}
      status={goal.status}
      target_date={goal.target_date}
      deleteGoal={deleteGoal}
    />
  ));

  console.log("Goals:", goals);
  console.log("Goals List:", goalsList);

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
