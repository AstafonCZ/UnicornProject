import { useEffect, useState } from "react";
import axios from "axios";

function Assignments() {
  const [assignments, setAssignments] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    dueDate: "",
    reminderTime: "",
    userId: "user-001",
  });

  useEffect(() => {
    axios.get("http://localhost:3000/assignment/list")
      .then((response) => {
        setAssignments(response.data.assignments);
      })
      .catch((error) => {
        console.error("Error fetching assignments:", error);
      });
  }, []);

  function handleDelete(id) {
    axios.delete(`http://localhost:3000/assignment/${id}`)
      .then(() => {
        setAssignments((prev) => prev.filter((a) => a.id !== id));
      })
      .catch((error) => {
        console.error("Failed to delete assignment:", error);
      });
  }

  function handleToggle(id) {
    axios.patch(`http://localhost:3000/assignment/${id}/toggle`)
      .then((response) => {
        setAssignments((prev) =>
          prev.map((a) => (a.id === id ? response.data.assignment : a))
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
    axios.post("http://localhost:3000/assignment/create", formData)
      .then((response) => {
        setAssignments((prev) => [...prev, response.data.assignment]);
        setFormData({ title: "", subject: "", dueDate: "", reminderTime: "", userId: "user-001" });
      })
      .catch((error) => {
        console.error("Failed to create assignment:", error);
      });
  }

  return (
    <div>
      <h2>Assignments</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" required />
        <input name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Subject" required />
        <input name="dueDate" type="date" value={formData.dueDate} onChange={handleInputChange} required />
        <input name="reminderTime" type="datetime-local" value={formData.reminderTime} onChange={handleInputChange} />
        <button type="submit">Add</button>
      </form>

      {assignments.length === 0 ? (
        <p>No assignments found.</p>
      ) : (
        <ul>
          {assignments.map((assignment) => (
            <li key={assignment.id}>
              <strong>{assignment.title}</strong> – {assignment.subject} (Due: {assignment.dueDate})
              <button onClick={() => handleDelete(assignment.id)} style={{ marginLeft: "10px" }}>🗑️</button>
              <button onClick={() => handleToggle(assignment.id)} style={{ marginLeft: "10px" }}>
                {assignment.completed ? "✅" : "⬜"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Assignments;
