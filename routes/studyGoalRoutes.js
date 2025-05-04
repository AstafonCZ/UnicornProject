const express = require("express");
const router = express.Router();
const {
  createStudyGoal,
  listStudyGoals,
} = require("../controllers/studyGoalController");

router.post("/create", createStudyGoal);
router.get("/list", listStudyGoals);

module.exports = router;
