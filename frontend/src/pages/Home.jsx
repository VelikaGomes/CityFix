import { useEffect, useState } from "react";
import IssueCard from "../components/IssueCard";
import { getIssues } from "../services/api";
import { Link } from "react-router-dom";

function Home() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    inProgress: 0
  });

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setLoading(true);
        const data = await getIssues();
        setIssues(data);
        
        // Calculate stats
        setStats({
          total: data.length,
          pending: data.filter(i => i.status === "Pending").length,
          inProgress: data.filter(i => i.status === "In Progress").length,
          resolved: data.filter(i => i.status === "Resolved").length
        });
      } catch (error) {
        console.error("Error fetching issues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  // Sample data for demonstration (remove when API is ready)
  const sampleIssues = [
    {
      id: 1,
      title: "Broken Street Light",
      description: "The street light at Main St and 5th Ave has been flickering for days",
      status: "Pending",
      location: "Main St & 5th Ave",
      reportedBy: "John D.",
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Pothole on Residential Road",
      description: "Large pothole forming on Oak Street near the community park",
      status: "In Progress",
      location: "123 Oak Street",
      reportedBy: "Sarah M.",
      date: "2024-01-14",
    },
    {
      id: 3,
      title: "Graffiti on Public Building",
      description: "Fresh graffiti on the community center wall",
      status: "Resolved",
      location: "456 Maple Avenue",
      reportedBy: "Mike R.",
      date: "2024-01-13",
    },
  ];

  // Use sample data if no real data yet
  const displayIssues = issues.length > 0 ? issues : sampleIssues;

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Make Your City <span className="gradient-text">Better</span>
          </h1>
          <p className="hero-subtitle">
            Report and track community issues in real-time. Together, we can make our city cleaner, safer, and more beautiful.
          </p>
          <div className="hero-actions">
            <Link to="/report" className="btn btn-primary">
              <span>📢</span>
              Report an Issue
            </Link>
            <Link to="/map" className="btn btn-secondary">
              <span>🗺️</span>
              View Map
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="floating-card card-1">🏙️</div>
          <div className="floating-card card-2">📍</div>
          <div className="floating-card card-3">✅</div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-icon total">📋</span>
            <div className="stat-info">
              <h3>{stats.total || displayIssues.length}</h3>
              <p>Total Issues</p>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon pending">⏳</span>
            <div className="stat-info">
              <h3>{stats.pending || displayIssues.filter(i => i.status === "Pending").length}</h3>
              <p>Pending</p>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon progress">🔄</span>
            <div className="stat-info">
              <h3>{stats.inProgress || displayIssues.filter(i => i.status === "In Progress").length}</h3>
              <p>In Progress</p>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon resolved">✅</span>
            <div className="stat-info">
              <h3>{stats.resolved || displayIssues.filter(i => i.status === "Resolved").length}</h3>
              <p>Resolved</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Issues Section */}
      <section className="recent-issues-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Recent Issues</h2>
            <p className="section-subtitle">Latest reports from your community</p>
          </div>
          <Link to="/map" className="view-all-link">
            View All
            <span className="arrow">→</span>
          </Link>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading issues...</p>
          </div>
        ) : displayIssues.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏙️</div>
            <h3>No Issues Reported Yet</h3>
            <p>Be the first to report an issue in your community</p>
            <Link to="/report" className="btn btn-primary">
              Report an Issue
            </Link>
          </div>
        ) : (
          <>
            <div className="issues-grid">
              {displayIssues.slice(0, 6).map(issue => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </div>

            {displayIssues.length > 6 && (
              <div className="view-more-container">
                <Link to="/map" className="btn btn-outline">
                  View All {displayIssues.length} Issues
                </Link>
              </div>
            )}
          </>
        )}
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2 className="section-title text-center">How It Works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-icon">📢</div>
            <h3>Report Issue</h3>
            <p>Submit a report with photos and location of the problem</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-icon">🔄</div>
            <h3>In Progress</h3>
            <p>Authorities review and assign the issue to relevant teams</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-icon">✅</div>
            <h3>Get Resolved</h3>
            <p>Track progress and get notified when it's fixed</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to make a difference?</h2>
          <p>Join your community in making the city better, one report at a time.</p>
          <Link to="/report" className="btn btn-primary btn-large">
            Report an Issue Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;