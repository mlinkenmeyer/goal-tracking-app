import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.js";
import NavBar from "./NavBar.js";
import GoalsPage from "./GoalsPage.js";
import Users from "./Users"
import Journals from "./Journals"

function App() {
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
