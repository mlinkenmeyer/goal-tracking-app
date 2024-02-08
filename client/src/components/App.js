import { BrowserRouter, Routes, Route } from "react-router-dom";
import GoalsPage from "./GoalsPage.js";
import Users from "./Users"
import Journals from "./Journals"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/goals" element={<GoalsPage />} />
      </Routes>
      <Routes>
        <Route path="/users" element={<Users />} />
      </Routes>
      <Routes>
        <Route path="/journals" element={<Journals />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
