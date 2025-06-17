import React, { useEffect, useState } from 'react';
import { Item } from '../types';
import Navbar from '../../components/UserNavbar';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

interface CartItem extends Item {
  quantity: number;
}

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const increaseQty = (id: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

 const totalAmount = cart.reduce(
  (sum, item) => sum + parseFloat(item.price) * item.quantity,
  0
);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');

    const newOrder = {
      username: currentUser?.name || 'Guest',
      items: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
      })),
      status: 'Pending',
    };
     const updatedOrders = [...existingOrders, newOrder];
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    // Clear cart
    setCart([]);
    localStorage.removeItem('cart');

    // Show success
    setMessage('Order placed successfully!');
    setTimeout(() => setMessage(''), 3000);
  };
  const logout = () => {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <div>
      <Navbar onLogout={logout} isLoggedIn={false} />
      <div className="cart-container">
        <h2>Your Cart</h2>

        {message && <p className="success-msg">{message}</p>}

        {cart.length === 0 ? (
          <p>Your cart is empty 😞</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div>
                  <h4>{item.name}</h4>
                  <p>Price: ₹{item.price}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>Total: ₹{item.quantity * parseFloat(item.price)}</p>
                </div>
                <div className="cart-buttons">
                  <button onClick={() => increaseQty(item.id)}>➕</button>
                  <button onClick={() => removeItem(item.id)}>❌</button>
                </div>
              </div>
            ))}
            <h3>Grand Total: ₹{totalAmount}</h3>
            <button className="checkout-btn" onClick={handleCheckout}>✅ Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};


export default Cart;
