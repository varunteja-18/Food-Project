import React, { useEffect, useState } from 'react';
import { Item } from '../types';
import './Home.css';
import Navbar from '../../components/UserNavbar';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [items, setItems] = useState<Item[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items') || '[]');
    setItems(storedItems);
  }, []);

  const addToCart = (item: Item) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((c: Item & { quantity: number }) => c.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item.name} added to cart`);
  };

  const logout = () => {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <div>
      <Navbar isLoggedIn={true} onLogout={logout} />
      <div className="home-container">
        {items.map((item) => (
          <div className="card" key={item.id}>
            {item.image && (
              <img src={item.image} alt={item.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            )}
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Home;
