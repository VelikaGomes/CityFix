import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ReportIssue from "./pages/ReportIssue";
import AdminDashboard from "./pages/AdminDashboard";
import IssueDetails from "./pages/IssueDetails";
import MapView from "./components/MapView"; // Import MapView
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="app-container"> {/* Add container for padding */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<ReportIssue />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/issue/:id" element={<IssueDetails />} />
          <Route path="/map" element={<MapView />} /> {/* Add Map route */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;