import { useEffect, useState } from 'react';
import { getIssues } from '../services/api';
import { Link } from 'react-router-dom';

function ViewIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getIssues();
      setIssues(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>All Issues ({issues.length})</h1>
      <Link to="/">Back to Home</Link>
      
      <div style={{ marginTop: '20px' }}>
        {issues.map(issue => (
          <div key={issue.id} style={{
            border: '1px solid #ccc',
            padding: '15px',
            margin: '10px 0',
            borderRadius: '8px',
            background: '#f9f9f9'
          }}>
            <h3>{issue.title}</h3>
            <p><strong>ID:</strong> {issue.id}</p>
            <p><strong>Status:</strong> {issue.status}</p>
            <p><strong>Location:</strong> {issue.location}</p>
            <p><strong>Description:</strong> {issue.description}</p>
            <p><strong>Reported by:</strong> {issue.reportedBy}</p>
            <p><strong>Date:</strong> {issue.date}</p>
            <Link to={`/issue/${issue.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewIssues;