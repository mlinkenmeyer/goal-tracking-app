import React, { useState } from "react";
import GoalForm from "./GoalForm";

function Goal({ goal, deleteGoal, editGoal, showGoalForm, setShowGoalForm }) {
  const [showGoalEditForm, setShowGoalEditForm] = useState(false);
  const handleDeleteGoal = (e) => {
    fetch(`/goals/${goal.id}`, {
      method: "DELETE",
    }).then(() => deleteGoal(goal));
  };

  const handleEditGoal = (e) => {
    console.log("Editing " + goal.title);
    setShowGoalEditForm(true);
    setShowGoalEditForm(!showGoalEditForm);
  };

  return (
    <>
      <div>
        {goal.title}, {goal.description}, {goal.category}, {goal.status},{" "}
        {goal.target_date}
        {showGoalEditForm ? (
          <button onClick={handleEditGoal}>Cancel</button>
        ) : (
          <button onClick={handleEditGoal}>Edit</button>
        )}
        <button onClick={handleDeleteGoal}>Delete</button>
      </div>
      {showGoalEditForm ? (
        <GoalForm
          goal={goal}
          showGoalForm={showGoalForm}
          setShowGoalForm={setShowGoalForm}
          editGoal={editGoal}
          deleteGoal={deleteGoal}
        />
      ) : null}
    </>
  );
}

export default Goal;
