import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.js";
import NavBar from "./NavBar.js";
import GoalsPage from "./GoalsPage.js";
import Users from "./Users";
import Journals from "./Journals";

function App() {
  // const [goals, setGoals] = useState([]);

  // useEffect(() => {
  //   const fetchGoals = async () => {
  //     try {
  //       const response = await fetch("http://127.0.0.1:5555/goals");
  //       const goalsArray = await response.json();
  //       setGoals(goalsArray);
  //     } catch (error) {
  //       console.error("Error fetching goals:", error);
  //     }
  //   };
  //   fetchGoals();
  // }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path="goals" element={<GoalsPage />} />
            <Route path="users" element={<Users />} />
            <Route path="journals" element={<Journals />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
