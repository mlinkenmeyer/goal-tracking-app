import { BrowserRouter, Routes, Route } from "react-router-dom";
import GoalsPage from "./GoalsPage.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/goals" element={<GoalsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
