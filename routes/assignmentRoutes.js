const express = require("express");
const router = express.Router();
const {
  createAssignment,
  listAssignments
} = require("../controllers/assignmentController");

router.post("/create", createAssignment);
router.get("/list", listAssignments);

module.exports = router;
