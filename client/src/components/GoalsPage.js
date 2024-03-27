import React, { useState, useEffect } from "react";
import Goal from "./Goal";
import GoalForm from "./GoalForm";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) {
      return;
    }
    setGoals((goals) => {
      const oldIndex = goals.findIndex((user) => user.id === active.id);
      const newIndex = goals.findIndex((user) => user.id === over.id);
      return arrayMove(goals, oldIndex, newIndex);
    });
  };

  const SortableGoal = ({ goal }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: goal.id });
    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
    };

    return (
      <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
        <Goal
          key={goal.id}
          goal={goal}
          deleteGoal={deleteGoal}
          showGoalForm={showGoalForm}
          setShowGoalForm={setShowGoalForm}
          editGoal={editGoal}
        />
      </div>
    );
  };

  return (
    <div>
      <h1>Goals</h1>
      <input
        type="text"
        placeholder="Search goals"
        value={searchGoalsInput}
        onChange={(e) => setSearchGoalsInput(e.target.value)}
      />
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <div style={{ display: "flex" }}>
          {goalColumnOrder.map((status, index) => (
            <div key={index} style={{ marginRight: "20px" }}>
              <h2>{status}</h2>
              <SortableContext
                items={groupedGoalsByStatus[status.toLowerCase()] || []}
                strategy={verticalListSortingStrategy}
              >
                {groupedGoalsByStatus[status.toLowerCase()] &&
                  groupedGoalsByStatus[status.toLowerCase()].map((goal) => (
                    <SortableGoal key={goal.id} goal={goal}></SortableGoal>
                  ))}
              </SortableContext>
            </div>
          ))}
        </div>
      </DndContext>
      {showGoalForm ? (
        <>
          <GoalForm
            goals={goals}
            setGoals={setGoals}
            showGoalForm={showGoalForm}
            setShowGoalForm={setShowGoalForm}
          />
          <button onClick={toggleGoalForm}>Cancel</button>
        </>
      ) : (
        <button onClick={toggleGoalForm}>Create New Goal</button>
      )}
    </div>
  );
}

export default GoalsPage;
