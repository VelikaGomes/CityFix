import { createContext, useState, useContext, useEffect } from 'react';
import { getIssues, createIssue, updateIssueStatus } from '../services/api';

const IssueContext = createContext(null);

export const IssueProvider = ({ children }) => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load issues on mount
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
      const newIssue = await createIssue({
        ...issueData,
        id: Date.now(), // Generate ID (in real app, backend would do this)
        status: 'Pending',
        date: new Date().toISOString().split('T')[0],
        votes: 0,
        comments: []
      });
      
      setIssues(prev => [newIssue, ...prev]);
      return { success: true, issue: newIssue };
    } catch (error) {
      console.error('Error adding issue:', error);
      return { success: false, error: error.message };
    }
  };

  const updateIssue = async (issueId, updates) => {
    try {
      const updated = await updateIssueStatus(issueId, updates.status, updates.comment);
      setIssues(prev => prev.map(issue => 
        issue.id === issueId ? { ...issue, ...updates } : issue
      ));
      return { success: true };
    } catch (error) {
      console.error('Error updating issue:', error);
      return { success: false };
    }
  };

  const value = {
    issues,
    loading,
    addIssue,
    updateIssue,
    refreshIssues: loadIssues
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