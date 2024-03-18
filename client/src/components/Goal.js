import React, { useState } from "react";
import GoalForm from "./GoalForm";

function Goal({ goal, deleteGoal, editGoal }) {
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
      <div className="goal-container">
        <div>
          {goal.title}, {goal.description}, {goal.category}, {goal.status},{" "}
          {goal.target_date}
        </div>
        <div>
          {showGoalEditForm ? (
            <button onClick={handleEditGoal}>Cancel</button>
          ) : (
            <button onClick={handleEditGoal}>Edit</button>
          )}
          <button onClick={handleDeleteGoal}>Delete</button>
        </div>
      </div>
      {showGoalEditForm && (
        <GoalForm
          goal={goal}
          showGoalEditForm={showGoalEditForm}
          setShowGoalEditForm={setShowGoalEditForm}
          editGoal={editGoal}
          deleteGoal={deleteGoal}
        />
      )}
    </>
  );
}

export default Goal;
