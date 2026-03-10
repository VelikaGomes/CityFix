const API_URL = 'http://localhost:3001/api';

// Get all issues
export const getIssues = async () => {
  try {
    const response = await fetch(`${API_URL}/issues`);
    if (!response.ok) throw new Error('Failed to fetch issues');
    const data = await response.json();
    console.log('Fetched issues:', data.length);
    return data;
  } catch (error) {
    console.error('Error fetching issues:', error);
    return [];
  }
};

// Get single issue by ID
export const getIssueById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/issues/${id}`);
    if (!response.ok) throw new Error('Failed to fetch issue');
    const data = await response.json();
    console.log(`Fetched issue ${id}:`, data ? 'Found' : 'Not found');
    return data;
  } catch (error) {
    console.error('Error fetching issue:', error);
    return null;
  }
};

// Create new issue
export const createIssue = async (issue) => {
  try {
    const response = await fetch(`${API_URL}/issues`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: issue.title,
        description: issue.description,
        location: issue.location,
        category: issue.category,
        priority: issue.priority,
        reportedBy: issue.contactName || issue.reportedBy || 'Anonymous',
        contactEmail: issue.contactEmail || '',
        contactPhone: issue.contactPhone || '',
      }),
    });

    if (!response.ok) throw new Error('Failed to create issue');
    
    const data = await response.json();
    console.log('Issue created:', data);
    return data;
  } catch (error) {
    console.error('Error creating issue:', error);
    throw error;
  }
};

// Update issue status
export const updateIssueStatus = async (id, status, comment = "") => {
  try {
    const response = await fetch(`${API_URL}/issues/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status, comment }),
    });

    if (!response.ok) throw new Error('Failed to update issue');
    
    const data = await response.json();
    console.log('Issue updated:', data);
    return { 
      id, 
      status, 
      success: true,
      issue: data
    };
  } catch (error) {
    console.error('Error updating issue:', error);
    throw error;
  }
};

// Delete issue
export const deleteIssue = async (id) => {
  try {
    const response = await fetch(`${API_URL}/issues/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Failed to delete issue');
    
    const data = await response.json();
    console.log('Issue deleted:', id);
    return data;
  } catch (error) {
    console.error('Error deleting issue:', error);
    throw error;
  }
};

// Note: Comments and votes would need their own API endpoints
// For now, these functions will be placeholders until you create the backend routes

// Add comment to issue (placeholder - needs backend implementation)
export const addComment = async (id, comment, user) => {
  console.warn('Comment functionality not implemented in backend yet');
  return { success: false, error: 'Not implemented' };
};

// Vote on issue (placeholder - needs backend implementation)
export const voteIssue = async (id) => {
  console.warn('Vote functionality not implemented in backend yet');
  return { success: false, error: 'Not implemented' };
};

// Clear all data (for testing) - Not applicable for database
export const clearAllData = () => {
  console.warn('Cannot clear database from frontend');
};
