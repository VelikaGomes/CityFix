const express = require("express");
const router = express.Router();

const {
  getIssues,
  getIssueById,
  createIssue,
  updateIssueStatus,
  deleteIssue
} = require("../controllers/issueController");

router.get("/issues", getIssues);
router.get("/issues/:id", getIssueById);
router.post("/issues", createIssue);
router.put("/issues/:id", updateIssueStatus);
router.delete("/issues/:id", deleteIssue);

module.exports = router;