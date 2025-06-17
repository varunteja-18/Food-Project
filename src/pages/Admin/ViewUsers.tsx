import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import { useNavigate } from 'react-router-dom';

interface User {
  name: string;
  email: string;
}

const ViewUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('users');
    if (stored) {
      setUsers(JSON.parse(stored));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/');
  };

  return (
    <div>
      <AdminNavbar onLogout={logout} isLoggedIn={false} />
      <div style={{ padding: '20px' }}>
        <h2>👥 Registered Users</h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          users.map((user, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewUsers;
