import React, { useState } from "react";
import GoalForm from "./GoalForm";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";

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
      <div>
        <div>
          Goal id = {goal.id} Title: {goal.title}, {goal.description},{" "}
          {goal.category}, {goal.status}, {goal.target_date}
        </div>
        <div>
          <Stack spacing={0} direction="row" style={{ marginTop: "5px" }}>
            {showGoalEditForm ? (
              <Button
                size="medium"
                variant="contained"
                onClick={handleEditGoal}
              >
                Cancel
              </Button>
            ) : (
              <Button
                size="medium"
                variant="contained"
                onClick={handleEditGoal}
              >
                Edit
              </Button>
            )}
            <div className="delete-icon-wrapper">
              <Button onClick={handleDeleteGoal}>
                <DeleteIcon style={{ color: "#000" }} />
              </Button>
            </div>
          </Stack>
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
