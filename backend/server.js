const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Get all issues
app.get('/api/issues', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM issues ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching issues:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get single issue by ID
app.get('/api/issues/:id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM issues WHERE id = ?', [req.params.id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: 'Issue not found' });
        }
    } catch (error) {
        console.error('Error fetching issue:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Create new issue
app.post('/api/issues', async (req, res) => {
    const { title, description, location, priority, category, reportedBy, contactEmail, contactPhone } = req.body;
    
    try {
        const [result] = await db.query(
            'INSERT INTO issues (title, description, location, priority, category, reported_by, contact_email, contact_phone, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
            [title, description, location, priority || 'Medium', category || 'Other', reportedBy || 'Anonymous', contactEmail || '', contactPhone || '', 'Pending']
        );
        
        const [newIssue] = await db.query('SELECT * FROM issues WHERE id = ?', [result.insertId]);
        res.status(201).json(newIssue[0]);
    } catch (error) {
        console.error('Error creating issue:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Update issue status
app.put('/api/issues/:id/status', async (req, res) => {
    const { status } = req.body;
    
    try {
        await db.query('UPDATE issues SET status = ? WHERE id = ?', [status, req.params.id]);
        
        const [updated] = await db.query('SELECT * FROM issues WHERE id = ?', [req.params.id]);
        res.json(updated[0]);
    } catch (error) {
        console.error('Error updating issue:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Delete issue
app.delete('/api/issues/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM issues WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting issue:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Add comment to issue
app.post('/api/issues/:id/comments', async (req, res) => {
  const { comment, user } = req.body;
  
  try {
    const [result] = await db.query(
      'INSERT INTO comments (issue_id, user_name, comment, created_at) VALUES (?, ?, ?, NOW())',
      [req.params.id, user || 'Anonymous', comment]
    );
    
    const [newComment] = await db.query('SELECT * FROM comments WHERE id = ?', [result.insertId]);
    res.status(201).json(newComment[0]);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get comments for an issue
app.get('/api/issues/:id/comments', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM comments WHERE issue_id = ? ORDER BY created_at DESC', [req.params.id]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Vote on issue
app.post('/api/issues/:id/vote', async (req, res) => {
  try {
    await db.query('UPDATE issues SET votes = votes + 1 WHERE id = ?', [req.params.id]);
    
    const [updated] = await db.query('SELECT votes FROM issues WHERE id = ?', [req.params.id]);
    res.json({ votes: updated[0].votes });
  } catch (error) {
    console.error('Error voting:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get issue updates
app.get('/api/issues/:id/updates', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM issue_updates WHERE issue_id = ? ORDER BY created_at DESC', [req.params.id]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching updates:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});