const db = require("../config/db");

// GET all issues (newest first)
exports.getIssues = (req, res) => {
  const sql = "SELECT * FROM issues ORDER BY created_at DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error", details: err });
    }
    res.json(results);
  });
};

// GET single issue by ID
exports.getIssueById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM issues WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error", details: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Issue not found" });
    }
    res.json(results[0]);
  });
};

// CREATE new issue
exports.createIssue = (req, res) => {
  const { title, description, location, status } = req.body;

  // Validate required fields
  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required" });
  }

  // Use provided location or default, provided status or default
  const issueLocation = location || "Not specified";
  const issueStatus = status || "Pending";

  const sql = "INSERT INTO issues (title, description, location, status) VALUES (?, ?, ?, ?)";
  
  db.query(sql, [title, description, issueLocation, issueStatus], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error", details: err });
    }

    // Fetch the newly created issue
    const selectSql = "SELECT * FROM issues WHERE id = ?";
    db.query(selectSql, [result.insertId], (err, newIssue) => {
      if (err) {
        // Still return success even if we can't fetch the new issue
        return res.status(201).json({
          message: "Issue created successfully",
          issueId: result.insertId
        });
      }
      res.status(201).json({
        message: "Issue created successfully",
        issueId: result.insertId,
        issue: newIssue[0]
      });
    });
  });
};

// UPDATE issue status
exports.updateIssueStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }

  const sql = "UPDATE issues SET status = ? WHERE id = ?";
  
  db.query(sql, [status, id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error", details: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Issue not found" });
    }

    // Fetch the updated issue
    const selectSql = "SELECT * FROM issues WHERE id = ?";
    db.query(selectSql, [id], (err, updatedIssue) => {
      if (err) {
        return res.json({
          message: "Issue status updated successfully",
          affectedRows: result.affectedRows
        });
      }
      res.json({
        message: "Issue status updated successfully",
        issue: updatedIssue[0]
      });
    });
  });
};

// DELETE issue
exports.deleteIssue = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM issues WHERE id = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error", details: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Issue not found" });
    }

    res.json({
      message: "Issue deleted successfully",
      affectedRows: result.affectedRows
    });
  });
};