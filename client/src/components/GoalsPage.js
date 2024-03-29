import React, { useState, useEffect } from "react";
import Goal from "./Goal";
import GoalForm from "./GoalForm";

function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [searchGoalsInput, setSearchGoalsInput] = useState("");

  useEffect(() => {
    const fetchGoals = async () => {
      const response = await fetch("http://127.0.0.1:5555/goals");
      const goalsArray = await response.json();
      setGoals(goalsArray);
    };
    fetchGoals().catch(console.error);
  }, []);

  // console.log(goals);

  const toggleGoalForm = (e) => {
    console.log("Add goal");
    setShowGoalForm(!showGoalForm);
  };

  const editGoal = (existingGoal) => {
    const updatedGoals = goals.map((goal) => {
      if (goal.id === existingGoal.id) {
        return existingGoal;
      } else {
        return goal;
      }
    });
    setGoals(updatedGoals);
  };

  const deleteGoal = (deleteGoal) => {
    const updatedGoals = goals.filter((goal) => goal.id !== deleteGoal.id);
    setGoals(updatedGoals);
  };

  const filteredGoals = goals.filter(
    (goal) =>
      goal.title.toLowerCase().includes(searchGoalsInput.toLowerCase()) ||
      goal.description.toLowerCase().includes(searchGoalsInput.toLowerCase()) ||
      goal.category.toLowerCase().includes(searchGoalsInput.toLowerCase()) ||
      goal.status.toLowerCase().includes(searchGoalsInput.toLowerCase()) ||
      goal.target_date.toLowerCase().includes(searchGoalsInput.toLowerCase())
  );

  const goalsList = filteredGoals.map((goal) => (
    <Goal
      key={goal.id}
      goal={goal}
      title={goal.title}
      description={goal.description}
      status={goal.status}
      target_date={goal.target_date}
      deleteGoal={deleteGoal}
      showGoalForm={showGoalForm}
      setShowGoalForm={setShowGoalForm}
      editGoal={editGoal}
    />
  ));

  return (
    <div>
      <h1>Goals</h1>
      <input
        type="text"
        placeholder="Search goals"
        value={searchGoalsInput}
        onChange={(e) => setSearchGoalsInput(e.target.value)}
      />
      {goalsList}
      {showGoalForm ? (
        <>
          <GoalForm
            goals={goals}
            setGoals={setGoals}
            showGoalForm={showGoalForm}
            setShowGoalForm={setShowGoalForm}
          />

          <button onClick={toggleGoalForm}>Cancel</button>
        </>
      ) : (
        <button onClick={toggleGoalForm}>Create New Goal</button>
      )}
    </div>
  );
}

export default GoalsPage;
