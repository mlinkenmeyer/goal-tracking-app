import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Users from "./Users"
import Journals from "./Journals"

function App() {
  return(
    <div>
      <h1>Goal Tracking App</h1>
      <Users />
      <Journals />
    </div>
  )
}

export default App;
