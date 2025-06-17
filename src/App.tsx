import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import AdminLogin from './pages/Admin/AdminLogin';
import AddItem from './pages/Admin/AddItem';
import ViewOrders from './pages/Admin/ViewOrders';
import ViewUsers from './pages/Admin/ViewUsers';
import UserLogin from './pages/User/UserLogin';
import Register from './pages/User/Register';
import Home from './pages/User/Home';
import Cart from './pages/User/Cart';
import MyOrders from './pages/User/MyOrders';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/add-item" element={<AddItem />} />
        <Route path="/admin/view-orders" element={<ViewOrders />} />
        <Route path="/admin/view-users" element={<ViewUsers />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/home" element={<Home />} />
        <Route path="/user/cart" element={<Cart />} />
        <Route path="/user/orders" element={<MyOrders />} />
      </Routes>
    </Router>
  );
}

export default App;
