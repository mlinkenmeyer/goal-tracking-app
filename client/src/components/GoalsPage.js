import React, { useState, useEffect } from "react";
import Goal from "./Goal";
import GoalForm from "./GoalForm";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [searchGoalsInput, setSearchGoalsInput] = useState("");

  // fetch goals from API endpoint
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5555/goals");
        const goalsArray = await response.json();
        setGoals(goalsArray);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };
    fetchGoals();
  }, []);

  const toggleGoalForm = () => {
    setShowGoalForm(!showGoalForm);
  };

  const editGoal = (existingGoal) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === existingGoal.id ? existingGoal : goal
    );
    setGoals(updatedGoals);
  };

  const deleteGoal = (deletedGoal) => {
    const updatedGoals = goals.filter((goal) => goal.id !== deletedGoal.id);
    setGoals(updatedGoals);
  };

  // filters the goals based on search input
  const filteredGoals = goals.filter(
    (goal) =>
      goal.title.toLowerCase().includes(searchGoalsInput.toLowerCase()) ||
      goal.description.toLowerCase().includes(searchGoalsInput.toLowerCase()) ||
      goal.category.toLowerCase().includes(searchGoalsInput.toLowerCase()) ||
      goal.status.toLowerCase().includes(searchGoalsInput.toLowerCase()) ||
      goal.target_date.toLowerCase().includes(searchGoalsInput.toLowerCase())
  );

  const groupedGoalsByStatus = {};

  filteredGoals.forEach((goal) => {
    const goalStatus = goal.status.toLowerCase();
    if (!groupedGoalsByStatus[goalStatus]) {
      groupedGoalsByStatus[goalStatus] = [];
    }
    groupedGoalsByStatus[goalStatus].push(goal);
  });

  const goalColumnOrder = ["not yet started", "in progress", "complete"];

  return (
    <div>
      <h1>Goals</h1>
      <input
        type="text"
        placeholder="Search goals"
        value={searchGoalsInput}
        onChange={(e) => setSearchGoalsInput(e.target.value)}
      />

      <div style={{ display: "flex" }}>
        {goalColumnOrder.map((status, index) => (
          <div key={index} style={{ marginRight: "20px" }}>
            <h2>{status}</h2>
            {groupedGoalsByStatus[status.toLowerCase()] &&
              groupedGoalsByStatus[status.toLowerCase()].map((goal) => (
                <Card key={goal.id} style={{ marginBottom: "10px" }}>
                  <CardContent>
                    <Goal
                      key={goal.id}
                      goal={goal}
                      deleteGoal={deleteGoal}
                      showGoalForm={showGoalForm}
                      setShowGoalForm={setShowGoalForm}
                      editGoal={editGoal}
                    />
                  </CardContent>
                </Card>
              ))}
          </div>
        ))}
      </div>

      {showGoalForm ? (
        <>
          <GoalForm
            goals={goals}
            setGoals={setGoals}
            showGoalForm={showGoalForm}
            setShowGoalForm={setShowGoalForm}
          />
          <Button
            size="medium"
            variant="contained"
            onClick={toggleGoalForm}
            style={{ marginTop: "10px" }}
          >
            Cancel
          </Button>
        </>
      ) : (
        <Button size="medium" variant="contained" onClick={toggleGoalForm}>
          Create New Goal
        </Button>
      )}
    </div>
  );
}

export default GoalsPage;
