import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.js";
import NavBar from "./NavBar.js";
import GoalsPage from "./GoalsPage.js";
import Users from "./Users";
import Journals from "./Journals";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

function App() {
  const [goals, setGoals] = useState([]);

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

  const getGoalPosition = (id) => goals.findIndex((goal) => goal.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setGoals((goals) => {
      const originalPosition = getGoalPosition(active.id);
      const newPosition = getGoalPosition(over.id);

      return arrayMove(goals, originalPosition, newPosition);
    });
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Home />} />
            <Route
              path="goals"
              element={
                <DndContext
                  onDragEnd={handleDragEnd}
                  collisionDetection={closestCorners}
                >
                  <GoalsPage goals={goals} setGoals={setGoals} />
                </DndContext>
              }
            />
            <Route path="users" element={<Users />} />
            <Route path="journals" element={<Journals />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
