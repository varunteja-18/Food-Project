// src/pages/Landing.tsx
import React, { useState } from 'react';
import AdminLogin from './Admin/AdminLogin';
import UserLogin from './User/UserLogin';

const Landing = () => {
  const [tab, setTab] = useState<'admin' | 'user'>('admin');

  return (
    <div>
      <h1>Welcome to FoodCourt</h1>
      <div>
        <button onClick={() => setTab('admin')}>Admin</button>
        <button onClick={() => setTab('user')}>User</button>
      </div>
      <div>{tab === 'admin' ? <AdminLogin /> : <UserLogin />}</div>
    </div>
  );
};

export default Landing;
