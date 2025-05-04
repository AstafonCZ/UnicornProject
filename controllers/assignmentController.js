const { Assignment, fakeDatabase } = require("../models/assignment");

// POST /assignment/create
function createAssignment(req, res) {
  const { title, subject, dueDate, reminderTime, userId } = req.body;

  if (!title || !subject || !dueDate || !userId) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const newAssignment = new Assignment({
    id: Date.now().toString(),
    title,
    subject,
    dueDate,
    reminderTime,
    userId,
  });

  fakeDatabase.push(newAssignment);

  res.status(201).json({
    message: "Assignment created",
    assignment: newAssignment,
  });
}

// GET /assignment/list
function listAssignments(req, res) {
  res.status(200).json({ assignments: fakeDatabase });
}

module.exports = {
  createAssignment,
  listAssignments,
};
