import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import { useNavigate } from 'react-router-dom';

interface Order {
  username: string;
  items: { name: string; quantity: number }[];
  status: string;
}

const ViewOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('orders');
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, []);

  const updateStatus = (index: number, newStatus: string) => {
    const updated = [...orders];
    updated[index].status = newStatus;
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
  };

  const logout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/');
  };

  return (
    <div>
      <AdminNavbar onLogout={logout} isLoggedIn={false} />
      <div style={{ padding: '20px' }}>
        <h2>📦 All Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order, idx) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
              <p><strong>User:</strong> {order.username}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>{item.name} × {item.quantity}</li>
                ))}
              </ul>
              {order.status === 'Pending' && (
                <div>
                  <button style={{ marginRight: '10px', backgroundColor: 'green', color: 'white', padding: '5px' }}
                    onClick={() => updateStatus(idx, 'Approved')}>
                    Approve
                  </button>
                  <button style={{ backgroundColor: 'red', color: 'white', padding: '5px' }}
                    onClick={() => updateStatus(idx, 'Cancelled')}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewOrders;
