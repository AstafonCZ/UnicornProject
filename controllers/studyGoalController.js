const { StudyGoal, studyGoalDB } = require("../models/studyGoal");

function createStudyGoal(req, res) {
  const { subject, hoursPerWeek, userId } = req.body;

  if (!subject || !hoursPerWeek || !userId) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const newGoal = new StudyGoal({
    id: Date.now().toString(),
    subject,
    hoursPerWeek,
    userId,
  });

  studyGoalDB.push(newGoal);

  res.status(201).json({ message: "Study goal created", goal: newGoal });
}

function listStudyGoals(req, res) {
  res.status(200).json({ goals: studyGoalDB });
}

module.exports = {
  createStudyGoal,
  listStudyGoals,
};
