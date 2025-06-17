import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

interface Props {
    isLoggedIn: boolean;
  onLogout: () => void;
}

const AdminNavbar: React.FC<Props> = ({ onLogout }) => {
  return (
    <nav className="navbar">
      <h2>🛠️ Admin Panel</h2>
      <div>
        <Link to="/admin/add-item" className="nav-link">Add Items</Link>
        <Link to="/admin/view-orders" className="nav-link">Orders</Link>
        <Link to="/admin/view-users" className="nav-link">Users</Link>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
