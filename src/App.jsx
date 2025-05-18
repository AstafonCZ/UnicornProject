import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Assignments from "./pages/Assignments";
import StudyGoals from "./pages/StudyGoals";

function App() {
  return (
    <Router>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h1>RememberToStudy</h1>
        <nav style={{ marginBottom: "1rem" }}>
          <Link to="/assignments" style={{ marginRight: "1rem" }}>Assignments</Link>
          <Link to="/study-goals">Study Goals</Link>
        </nav>

        <Routes>
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/study-goals" element={<StudyGoals />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
