import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { IssueProvider } from './context/IssueContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Navbar from './components/Navbar.jsx';

// Pages
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import ReportIssue from './pages/ReportIssue.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import IssueDetails from './pages/IssueDetails.jsx';
import MapView from './pages/MapView.jsx';
import ViewIssues from './pages/ViewIssues.jsx';

function App() {
  return (
    <AuthProvider>
      <IssueProvider>
        <Router>
          <div className="app">
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/map" element={<MapView />} />
              <Route path="/issues" element={<ViewIssues />} />
              <Route path="/issue/:id" element={<IssueDetails />} />
              
              {/* Protected Routes - Require Login */}
              <Route path="/report" element={
                <ProtectedRoute>
                  <ReportIssue />
                </ProtectedRoute>
              } />
              
              {/* Admin Only Routes */}
              <Route path="/admin" element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </IssueProvider>
    </AuthProvider>
  );
}

export default App;