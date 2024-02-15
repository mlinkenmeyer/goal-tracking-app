import React from "react";

function Goal({ goal, deleteGoal }) {
  const handleDeleteGoal = (e) => {
    fetch(`/goals/${goal.id}`, {
      method: "DELETE",
    }).then(() => deleteGoal(goal));
  };

  return (
    <div>
      {goal.title}, {goal.description}, {goal.status}, {goal.target_date}
      <button>Edit</button>
      <button onClick={handleDeleteGoal}>Delete</button>
    </div>
  );
}

export default Goal;
