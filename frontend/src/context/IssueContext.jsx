import { createContext, useState, useContext, useEffect } from 'react';
import { getIssues, createIssue, updateIssueStatus, deleteIssue as deleteIssueApi } from '../services/api';

const IssueContext = createContext(null);

export const IssueProvider = ({ children }) => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load issues from API on mount
  useEffect(() => {
    loadIssues();
  }, []);

  const loadIssues = async () => {
    try {
      setLoading(true);
      const data = await getIssues();
      setIssues(data);
    } catch (error) {
      console.error('Error loading issues:', error);
    } finally {
      setLoading(false);
    }
  };

  const addIssue = async (issueData) => {
    try {
      // First save to API/database
      const savedIssue = await createIssue({
        ...issueData,
        id: Date.now(), // In real app, backend would generate ID
        status: 'Pending',
        date: new Date().toISOString().split('T')[0],
        votes: 0,
        comments: []
      });
      
      // Then update local state
      setIssues(prev => [savedIssue, ...prev]);
      
      // Optional: Refresh from API to ensure sync
      await loadIssues();
      
      return { success: true, issue: savedIssue };
    } catch (error) {
      console.error('Error adding issue:', error);
      return { success: false, error: error.message };
    }
  };

  const updateIssue = async (issueId, updates) => {
    try {
      // Update in API/database
      const updated = await updateIssueStatus(issueId, updates.status, updates.comment);
      
      // Update local state
      setIssues(prev => prev.map(issue => 
        issue.id === issueId ? { ...issue, ...updates } : issue
      ));
      
      // Optional: Refresh from API
      await loadIssues();
      
      return { success: true };
    } catch (error) {
      console.error('Error updating issue:', error);
      return { success: false };
    }
  };

  const deleteIssue = async (issueId) => {
    try {
      // Call your API to delete
      const result = await deleteIssueApi(issueId);
      
      if (result.success) {
        // Update local state
        setIssues(prev => prev.filter(issue => issue.id !== issueId));
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      console.error('Error deleting issue:', error);
      return { success: false };
    }
  };

  const refreshIssues = async () => {
    await loadIssues();
  };

  const value = {
    issues,
    loading,
    addIssue,
    updateIssue,
    deleteIssue,  // Add deleteIssue to the context value
    refreshIssues
  };

  return (
    <IssueContext.Provider value={value}>
      {children}
    </IssueContext.Provider>
  );
};

export const useIssues = () => {
  const context = useContext(IssueContext);
  if (!context) {
    throw new Error('useIssues must be used within IssueProvider');
  }
  return context;
};