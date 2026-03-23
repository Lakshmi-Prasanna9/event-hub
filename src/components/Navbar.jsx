import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, Calendar, Settings, Home } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardLink = () => {
    switch (user.role) {
      case 'admin':
        return '/admin';
      case 'organizer':
        return '/organizer';
      default:
        return '/user';
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">
            <Calendar size={28} />
            <span>EventHub India</span>
          </Link>
        </div>

        <div className="navbar-menu">
          <Link to="/" className="navbar-item">
            <Home size={18} />
            <span>Home</span>
          </Link>

          <Link to={getDashboardLink()} className="navbar-item">
            <Settings size={18} />
            <span>Dashboard</span>
          </Link>
        </div>

        <div className="navbar-user">
          <div className="user-info">
            <User size={20} />
            <span>{user.name}</span>
            <span className="user-role">{user.role}</span>
          </div>
          <button onClick={handleLogout} className="btn btn-danger btn-sm">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
