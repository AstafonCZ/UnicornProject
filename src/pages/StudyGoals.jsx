import { useEffect, useState } from "react";
import axios from "axios";

function StudyGoals() {
  const [goals, setGoals] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    subject: "",
    hoursPerWeek: "",
    userId: "user-001",
  });

  useEffect(() => {
    axios.get("http://localhost:3000/study-goal/list")
      .then((response) => {
        setGoals(response.data.goals);
      })
      .catch((error) => {
        console.error("Error fetching study goals:", error);
      });
  }, []);

  function handleDelete(id) {
    axios.delete(`http://localhost:3000/study-goal/${id}`)
      .then(() => {
        setGoals((prev) => prev.filter((g) => g.id !== id));
      })
      .catch((error) => {
        console.error("Failed to delete study goal:", error);
      });
  }

  function handleToggle(id) {
    axios.patch(`http://localhost:3000/study-goal/${id}/toggle`)
      .then((response) => {
        setGoals((prev) =>
          prev.map((g) => (g.id === id ? response.data.goal : g))
        );
      })
      .catch((error) => {
        console.error("Failed to toggle complete:", error);
      });
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios.post("http://localhost:3000/study-goal/create", formData)
      .then((response) => {
        setGoals((prev) => [...prev, response.data.goal]);
        setFormData({ subject: "", hoursPerWeek: "", userId: "user-001" });
      })
      .catch((error) => {
        console.error("Failed to create study goal:", error);
      });
  }

  return (
    <div>
      <h2>Study Goals</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Subject" required />
        <input name="hoursPerWeek" type="number" value={formData.hoursPerWeek} onChange={handleInputChange} placeholder="Hours per week" required />
        <button type="submit">Add</button>
      </form>

      {goals.length === 0 ? (
        <p>No study goals found.</p>
      ) : (
        <ul>
          {goals.map((goal) => (
            <li key={goal.id}>
              <strong>{goal.subject}</strong> – {goal.hoursPerWeek} hours
              <button onClick={() => handleDelete(goal.id)} style={{ marginLeft: "10px" }}>🗑️</button>
              <button onClick={() => handleToggle(goal.id)} style={{ marginLeft: "10px" }}>
                {goal.completed ? "✅" : "⬜"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudyGoals;
