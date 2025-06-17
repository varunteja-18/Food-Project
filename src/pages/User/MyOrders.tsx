import React, { useEffect, useState } from 'react';
import UserNavbar from '../../components/UserNavbar';
import { useNavigate } from 'react-router-dom';

interface Order {
  username: string;
  items: { name: string; quantity: number }[];
  status: string;
}

const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const myOrders = allOrders.filter((order: Order) => order.username === user.name);
    setOrders(myOrders);
  }, []);

  const logout = () => {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <div>
      <UserNavbar onLogout={logout} isLoggedIn={false} />
      <div style={{ padding: '20px' }}>
        <h2>🧾 My Orders</h2>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map((order, idx) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
              <p><strong>Status:</strong> <span style={{ color: getStatusColor(order.status) }}>{order.status}</span></p>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>{item.name} × {item.quantity}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

function getStatusColor(status: string): string {
  switch (status) {
    case 'Approved': return 'green';
    case 'Cancelled': return 'red';
    case 'Pending': return 'orange';
    default: return 'black';
  }
}

export default MyOrders;
