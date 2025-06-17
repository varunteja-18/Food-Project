import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import Navbar from '../../components/UserNavbar';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (found) {
      localStorage.setItem('userLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify(found));
      navigate('/user/home');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      {/* <Navbar isLoggedIn={false} onLogout={() => {}} /> */}
      <div style={{ padding: '20px' }}>
        <h2>User Login</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <button onClick={handleLogin}>Login</button>

        <p>
          Don’t have an account? <Link to="/user/register">Register Here</Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
