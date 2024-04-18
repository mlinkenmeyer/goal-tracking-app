import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const GoalForm = ({
  goals,
  setGoals,
  goal,
  editGoal,
  setShowGoalEditForm,
  setShowGoalForm,
}) => {
  const initialValues = {
    title: goal ? goal.title : "",
    description: goal ? goal.description : "",
    status: goal ? goal.status : "",
    category: goal ? goal.category : "",
    target_date: goal ? goal.target_date : "",
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required("Must enter a title."),
    description: yup.string().required("Must enter a description."),
    status: yup.string().required("Must enter a status."),
    category: yup.string().required("Must enter a category."),
    target_date: yup.string().required("Must enter a target date."),
  });

  const handleSubmitGoalForm = async (values) => {
    try {
      let response;
      if (goal) {
        response = await fetch(`/goals/${goal.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
      } else {
        response = await fetch("http://127.0.0.1:5555/goals", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
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
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmitGoalForm,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h2>{goal ? "Edit Goal" : "Create a new goal"}</h2>
        <TextField
          Title
          type="text"
          id="title"
          name="title"
          size="small"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        {formik.errors.title && <div>{formik.errors.title}</div>}
        <br />
        <TextField
          Description
          type="text"
          id="description"
          name="description"
          size="small"
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        {formik.errors.description && (
          <div div style={{ color: "red" }}>
            {formik.errors.description}
          </div>
        )}
        <br />
        <TextField
          Category
          type="text"
          id="category"
          name="category"
          size="small"
          label="Category"
          value={formik.values.category}
          onChange={formik.handleChange}
        />
        {formik.errors.category && <div>{formik.errors.category}</div>}
        <br />
        <TextField
          Status
          type="text"
          id="status"
          name="status"
          size="small"
          label="Status"
          value={formik.values.status}
          onChange={formik.handleChange}
        />
        {formik.errors.status && <div>{formik.errors.status}</div>}
        <br />
        <TextField
          Target
          Date
          type="text"
          id="target_date"
          name="target_date"
          size="small"
          label="Deadline"
          value={formik.values.target_date}
          onChange={formik.handleChange}
        />
        {formik.errors.target_date && <div>{formik.errors.target_date}</div>}
        <br />
        <div>
          <Button
            type="submit"
            size="medium"
            variant="contained"
            style={{ marginTop: "10px" }}
          >
            {goal ? "Save" : "Create Goal"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GoalForm;
