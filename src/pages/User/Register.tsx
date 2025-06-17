import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({ id: Date.now(), name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registered successfully');
    navigate('/');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Register</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br/><br/>
      <input
        type="email"
        placeholder="User Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br/><br/>
      <input
        type="password"
        placeholder="User Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br/><br/>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
