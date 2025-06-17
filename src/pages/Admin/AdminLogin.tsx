import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === 'admin@food.com' && password === 'admin123') {
      localStorage.setItem('adminLoggedIn', 'true');
      navigate('/admin/add-item');
    } else {
      alert('Invalid Admin Credentials');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Login</h2>
      <input
        type="email"
        placeholder="Admin Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br/><br/>
      <input
        type="password"
        placeholder="Admin Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br/><br/>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AdminLogin;
