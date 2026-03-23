import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import OrganizerDashboard from './pages/OrganizerDashboard';
import UserDashboard from './pages/UserDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import './App.css';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="app">
        {user && <Navbar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/organizer" 
            element={
              <ProtectedRoute allowedRoles={['organizer', 'admin']}>
                <OrganizerDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/user" 
            element={
              <ProtectedRoute allowedRoles={['user', 'admin', 'organizer']}>
                <UserDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
