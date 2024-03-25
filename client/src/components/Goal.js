import React, { useState } from "react";
import GoalForm from "./GoalForm";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Goal({ goal, deleteGoal, editGoal }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: goal.id });

  const style = { transition, transform: CSS.Transform.toString(transform) };

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
      <div
        className="goal-container"
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
      >
        <div>
          Goal id = {goal.id} Title: {goal.title}, {goal.description},{" "}
          {goal.category}, {goal.status}, {goal.target_date}
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
