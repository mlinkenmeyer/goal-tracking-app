import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

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
        <label>
          Title
          <input
            type="text"
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
        </label>
        {formik.errors.title && <div>{formik.errors.title}</div>}
        <br />
        <label>
          Description
          <input
            type="text"
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
        </label>
        {formik.errors.description && (
          <div div style={{ color: "red" }}>
            {formik.errors.description}
          </div>
        )}
        <br />
        <label>
          Category
          <input
            type="text"
            id="category"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
          />
        </label>
        {formik.errors.category && <div>{formik.errors.category}</div>}
        <br />
        <label>
          Status
          <input
            type="text"
            id="status"
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
          />
        </label>
        {formik.errors.status && <div>{formik.errors.status}</div>}
        <br />
        <label>
          Target Date
          <input
            type="text"
            id="target_date"
            name="target_date"
            value={formik.values.target_date}
            onChange={formik.handleChange}
          />
        </label>
        {formik.errors.target_date && <div>{formik.errors.target_date}</div>}
        <br />
        <button type="submit">{goal ? "Save" : "Create Goal"}</button>
        {goal && (
          <button type="button" onClick={() => setShowGoalEditForm(false)}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default GoalForm;

// import React, { useState } from "react";
// import { useFormik } from "formik";
// import * as yup from "yup";

// export const GoalForm = ({
//   goals,
//   setGoals,
//   goal,
//   editGoal,
//   setShowGoalEditForm,
//   setShowGoalForm,
// }) => {
//   // const [goalsFormValues, setGoalsFormValues] = useState({
//   //   title: goal ? goal.title : "",
//   //   description: goal ? goal.description : "",
//   //   status: goal ? goal.status : "",
//   //   category: goal ? goal.category : "",
//   //   target_date: goal ? goal.target_date : "",
//   // });

//   const initialGoalValues = {
//     title: "",
//     description: "",
//     status: "",
//     category: "",
//     target_date: "",
//   };

//   const validationSchema = yup.object().shape({
//     title: yup.string().required("Must enter a title."),
//     description: yup.string().required("Must enter a description."),
//     status: yup.string().required("Must enter a status."),
//     category: yup.string().required("Must enter a category."),
//     target_date: yup.string().required("Must enter a target date."),
//   });

//   const handleSubmitGoalForm = async (e) => {
//     e.preventDefault();

//     try {
//       let response;
//       if (goal) {
//         response = await fetch(`/goals/${goal.id}`, {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(goalsFormValues),
//         });
//       } else {
//         response = await fetch("http://127.0.0.1:5555/goals", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(goalsFormValues),
//         });
//       }

//       if (!response.ok) {
//         throw new Error(
//           goal ? "Failed to update goal" : "Failed to create goal"
//         );
//       }

//       const goalData = await response.json();
//       if (goal) {
//         editGoal(goalData);
//         setShowGoalEditForm(false);
//       } else {
//         setGoals([...goals, goalData]);
//         setShowGoalForm(false);
//       }

//       setGoalsFormValues({
//         title: "",
//         description: "",
//         status: "",
//         category: "",
//         target_date: "",
//       });
//     } catch (error) {
//       console.error("Error:", error.message);
//     }
//   };

//   const formik = useFormik({ initialValues, validationSchema, onSubmit });

//   return (
//     <div>
//       <form onSubmit={handleSubmitGoalForm}>
//         <h2>{goal ? "Edit Goal" : "Create a new goal"}</h2>
//         <label>
//           Title
//           <input
//             type="text"
//             value={goalsFormValues.title}
//             onChange={(e) =>
//               setGoalsFormValues({ ...goalsFormValues, title: e.target.value })
//             }
//           />
//         </label>
//         <br />
//         <label>
//           Description
//           <input
//             type="text"
//             value={goalsFormValues.description}
//             onChange={(e) =>
//               setGoalsFormValues({
//                 ...goalsFormValues,
//                 description: e.target.value,
//               })
//             }
//           />
//         </label>
//         <br />
//         <label>
//           Category
//           <input
//             type="text"
//             value={goalsFormValues.category}
//             onChange={(e) =>
//               setGoalsFormValues({
//                 ...goalsFormValues,
//                 category: e.target.value,
//               })
//             }
//           />
//         </label>
//         <br />
//         <label></label>
//         <label>
//           Status
//           <input
//             type="text"
//             value={goalsFormValues.status}
//             onChange={(e) =>
//               setGoalsFormValues({ ...goalsFormValues, status: e.target.value })
//             }
//           />
//         </label>
//         <br />
//         <label>
//           Target Date
//           <input
//             type="text"
//             value={goalsFormValues.target_date}
//             onChange={(e) =>
//               setGoalsFormValues({
//                 ...goalsFormValues,
//                 target_date: e.target.value,
//               })
//             }
//           />
//         </label>
//         <br />
//         <button type="submit">{goal ? "Save" : "Create Goal"}</button>
//         {goal && (
//           <button onClick={() => setShowGoalEditForm(false)}>Cancel</button>
//         )}
//       </form>
//     </div>
//   );
// };

// export default GoalForm;
