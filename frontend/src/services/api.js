// Initialize with sample data if no data exists
const initializeData = () => {
  const existing = localStorage.getItem('cityfix_issues');
  if (!existing) {
    const sampleData = [
      {
        id: 1,
        title: "Broken Street Light",
        description: "The street light at Main St and 5th Ave has been flickering for days and is now completely out. This creates a safety hazard at night for pedestrians and vehicles.",
        status: "Pending",
        location: "Main St & 5th Ave",
        reportedBy: "John D.",
        reporterContact: "john@example.com",
        date: "2024-01-15",
        priority: "High",
        category: "Infrastructure",
        votes: 12,
        comments: [
          {
            id: 1,
            user: "Sarah M.",
            comment: "This is really dangerous at night!",
            date: "2024-01-15",
            avatar: "👤",
          }
        ],
        updates: [
          {
            date: "2024-01-15",
            status: "Pending",
            comment: "Issue reported and awaiting review",
            updatedBy: "System",
          }
        ],
      },
      {
        id: 2,
        title: "Pothole on Residential Road",
        description: "Large pothole forming on Oak Street near the community park. Getting bigger with each rainstorm.",
        status: "In Progress",
        location: "123 Oak Street",
        reportedBy: "Sarah M.",
        reporterContact: "sarah@example.com",
        date: "2024-01-14",
        priority: "Medium",
        category: "Road Maintenance",
        votes: 8,
        comments: [],
        updates: [
          {
            date: "2024-01-15",
            status: "In Progress",
            comment: "Assigned to maintenance team",
            updatedBy: "Admin",
          },
          {
            date: "2024-01-14",
            status: "Pending",
            comment: "Issue reported",
            updatedBy: "System",
          },
        ],
      },
      {
        id: 3,
        title: "Graffiti on Public Building",
        description: "Fresh graffiti on the community center wall. Needs to be removed promptly.",
        status: "Resolved",
        location: "456 Maple Avenue",
        reportedBy: "Mike R.",
        reporterContact: "mike@example.com",
        date: "2024-01-13",
        priority: "Low",
        category: "Graffiti",
        votes: 5,
        comments: [],
        updates: [
          {
            date: "2024-01-14",
            status: "Resolved",
            comment: "Cleaned by maintenance crew",
            updatedBy: "Admin",
          },
          {
            date: "2024-01-13",
            status: "Pending",
            comment: "Issue reported",
            updatedBy: "System",
          },
        ],
      },
    ];
    localStorage.setItem('cityfix_issues', JSON.stringify(sampleData));
  }
};

// Get all issues
export const getIssues = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      initializeData(); // Make sure data exists
      const issues = JSON.parse(localStorage.getItem('cityfix_issues') || '[]');
      console.log('Fetched issues:', issues);
      resolve(issues);
    }, 500);
  });
};

// Get single issue by ID
export const getIssueById = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const issues = JSON.parse(localStorage.getItem('cityfix_issues') || '[]');
      const issue = issues.find(issue => issue.id === parseInt(id));
      console.log(`Fetched issue ${id}:`, issue);
      resolve(issue || null);
    }, 500);
  });
};

// Create new issue
export const createIssue = async (issue) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Get existing issues
      const issues = JSON.parse(localStorage.getItem('cityfix_issues') || '[]');
      
      // Create new issue with all fields
      const newIssue = {
        ...issue,
        id: Date.now(), // Use timestamp as ID
        date: new Date().toISOString().split('T')[0],
        status: issue.status || 'Pending',
        reportedBy: issue.contactName || 'Anonymous',
        votes: 0,
        comments: [],
        updates: [
          {
            date: new Date().toISOString().split('T')[0],
            status: issue.status || 'Pending',
            comment: 'Issue reported',
            updatedBy: 'System',
          }
        ],
        // Add default values for optional fields
        priority: issue.priority || 'Medium',
        category: issue.category || 'Other',
        location: issue.location || 'Not specified',
        reporterContact: issue.contactEmail || '',
      };

      // Add to issues array
      issues.push(newIssue);
      
      // Save back to localStorage
      localStorage.setItem('cityfix_issues', JSON.stringify(issues));
      
      console.log('Issue created:', newIssue);
      resolve(newIssue);
    }, 500);
  });
};

// Update issue status
export const updateIssueStatus = async (id, status, comment = "") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const issues = JSON.parse(localStorage.getItem('cityfix_issues') || '[]');
      const index = issues.findIndex(i => i.id === parseInt(id));
      
      if (index !== -1) {
        // Update status
        issues[index].status = status;
        
        // Add update to timeline
        if (!issues[index].updates) {
          issues[index].updates = [];
        }
        
        issues[index].updates.push({
          date: new Date().toISOString().split('T')[0],
          status: status,
          comment: comment || `Status updated to ${status}`,
          updatedBy: "Admin",
        });
        
        // Save back to localStorage
        localStorage.setItem('cityfix_issues', JSON.stringify(issues));
        
        console.log('Issue updated:', issues[index]);
        resolve({ 
          id, 
          status, 
          success: true,
          issue: issues[index]
        });
      } else {
        resolve({ success: false, error: 'Issue not found' });
      }
    }, 500);
  });
};

// Delete issue
export const deleteIssue = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const issues = JSON.parse(localStorage.getItem('cityfix_issues') || '[]');
      const filtered = issues.filter(i => i.id !== parseInt(id));
      localStorage.setItem('cityfix_issues', JSON.stringify(filtered));
      
      console.log('Issue deleted:', id);
      resolve({ success: true });
    }, 500);
  });
};