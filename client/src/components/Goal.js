import React from "react";

function Goal({ goal: { id, title, description, status, targetDate } }) {
  return (
    <div>
      {title}, {description}, {status}, {targetDate}
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
}

export default Goal;
