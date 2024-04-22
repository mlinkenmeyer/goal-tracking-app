import React, { useState } from "react";
import GoalForm from "./GoalForm";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

function Goal({ goal, deleteGoal, editGoal }) {
  console.log("Goal object:", goal);
  const [showGoalEditForm, setShowGoalEditForm] = useState(false);
  const handleDeleteGoal = (e) => {
    fetch(`/goals/${goal.id}`, {
      method: "DELETE",
    }).then(() => deleteGoal(goal));
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
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
          <Typography variant="h6" gutterBottom>
            {goal.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {goal.description}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Category: {goal.category}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Target Deadline: {goal.target_date}
          </Typography>
        </div>
        <Button size="medium" variant="contained" onClick={handleOpen}>
          View Journals
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Journal Entries
            </Typography>

            {/* {goal.journals.map((journal) => (
              <div key={journal.id}>
                <Typography variant="body1">{journal.date}</Typography>
                <Typography variant="body2">{journal.journal_entry}</Typography>
              </div>
            ))} */}
          </Box>
        </Modal>
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
