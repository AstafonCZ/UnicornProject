const express = require("express");
const app = express();
const port = 3000;

// Import routes
const assignmentRoutes = require("./routes/assignmentRoutes");
const studyGoalRoutes = require("./routes/studyGoalRoutes");

app.use(express.json());

// Register routes
app.use("/assignment", assignmentRoutes);
app.use("/study-goal", studyGoalRoutes);

// Default homepage
app.get("/", (req, res) => {
  res.send("RememberToStudy backend is running!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
