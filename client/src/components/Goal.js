import React from "react";

function Goal({ goal: { id, title, description, status, targetDate } }) {
  return (
    <div>
      {title}, {description}, {status}, {targetDate}
    </div>
  );
}

export default Goal;
