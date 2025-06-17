// import React, { useState, useEffect } from 'react';
// import { Item } from '../types';
// import Navbar from '../../components/AdminNavbar';
// import { useNavigate } from 'react-router-dom';

// const AddItem = () => {
//   const [items, setItems] = useState<Item[]>([]);
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState<string>("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedItems = JSON.parse(localStorage.getItem('items') || '[]');
//     setItems(storedItems);
//   }, []);

//   const handleAdd = () => {
//     if (!name || price <= "") return alert('Enter valid item and price');

//     const newItem: Item = {
//       id: Date.now(),
//       name,
//       price,
//     };

//     const updatedItems = [...items, newItem];
//     setItems(updatedItems);
//     localStorage.setItem('items', JSON.stringify(updatedItems));
//     setName('');
//     setPrice("");
//   };

//   const handleDelete = (id: number) => {
//     const updatedItems = items.filter((item) => item.id !== id);
//     setItems(updatedItems);
//     localStorage.setItem('items', JSON.stringify(updatedItems));
//   };

//   const logout = () => {
//     localStorage.removeItem('adminLoggedIn');
//     navigate('/');
//   };

//   return (
//     <div>
//       <Navbar isLoggedIn={true} onLogout={logout} />
//       <div style={{ padding: '20px' }}>
//         <h2>Add Food Item</h2>
//         <input
//           type="text"
//           placeholder="Food Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Price ₹"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//         />
//         <button onClick={handleAdd}>Add Item</button>

//         <h3>Available Items</h3>
//         <ul>
//           {items.map((item) => (
//             <li key={item.id}>
//               {item.name} - ₹{item.price}{' '}
//               <button onClick={() => handleDelete(item.id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default AddItem;

//second
// import React, { useEffect, useState } from 'react';
// import AdminNavbar from '../../components/AdminNavbar';
// import { useNavigate } from 'react-router-dom';

// interface Item {
//   id: number;
//   name: string;
//   price: number;
//   image?: string;
// }

// const foodOptions = [
//   'Pizza', 'Burger', 'Pasta', 'Biryani', 'Fries',
//   'Wrap', 'Momos', 'Sandwich', 'Salad', 'Ice Cream',
// ];

// const AddItem = () => {
//   const [selectedItem, setSelectedItem] = useState('');
//   const [price, setPrice] = useState('');
//   const [image, setImage] = useState<string | null>(null);
//   const [items, setItems] = useState<Item[]>([]);
//   const [editItemId, setEditItemId] = useState<number | null>(null);
//   const [editPrice, setEditPrice] = useState('');
//   const [editImage, setEditImage] = useState<string | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedItems = JSON.parse(localStorage.getItem('items') || '[]');
//     setItems(storedItems);
//   }, []);

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, forEdit = false) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       if (forEdit) setEditImage(reader.result as string);
//       else setImage(reader.result as string);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = () => {
//     if (!selectedItem || !price) {
//       alert('Please select an item and enter price.');
//       return;
//     }

//     if (items.some((item) => item.name === selectedItem)) {
//       alert('Item already exists.');
//       return;
//     }

//     const newItem: Item = {
//       id: Date.now(),
//       name: selectedItem,
//       price: parseFloat(price),
//       image: image || '',
//     };

//     const updatedItems = [...items, newItem];
//     setItems(updatedItems);
//     localStorage.setItem('items', JSON.stringify(updatedItems));

//     setSelectedItem('');
//     setPrice('');
//     setImage(null);
//     alert('Item added successfully!');
//   };

//   const handleDelete = (id: number) => {
//     const updated = items.filter((item) => item.id !== id);
//     setItems(updated);
//     localStorage.setItem('items', JSON.stringify(updated));
//   };

//   const startEdit = (item: Item) => {
//     setEditItemId(item.id);
//     setEditPrice(item.price.toString());
//     setEditImage(item.image || null);
//   };

//   const cancelEdit = () => {
//     setEditItemId(null);
//     setEditPrice('');
//     setEditImage(null);
//   };

//   const saveEdit = (id: number) => {
//     const updatedItems = items.map((item) =>
//       item.id === id
//         ? { ...item, price: parseFloat(editPrice), image: editImage || '' }
//         : item
//     );
//     setItems(updatedItems);
//     localStorage.setItem('items', JSON.stringify(updatedItems));
//     cancelEdit();
//   };

//   const logout = () => {
//     localStorage.removeItem('adminLoggedIn');
//     navigate('/');
//   };

//   return (
//     <div>
//       <AdminNavbar onLogout={logout} isLoggedIn={false} />
//       <div style={{ padding: '20px' }}>
//         <h2>Add New Item</h2>

//         <select
//           value={selectedItem}
//           onChange={(e) => setSelectedItem(e.target.value)}
//         >
//           <option value="">-- Select Food Item --</option>
//           {foodOptions.map((option) => (
//             <option
//               key={option}
//               value={option}
//               disabled={items.some((item) => item.name === option)}
//             >
//               {option}
//             </option>
//           ))}
//         </select><br /><br />

//         <input
//           type="number"
//           placeholder="Price"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//         /><br /><br />

//         <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e)} /><br /><br />

//         {image && (
//           <img
//             src={image}
//             alt="preview"
//             style={{ width: '150px', height: 'auto', borderRadius: '8px' }}
//           />
//         )}
//         <br />
//         <button onClick={handleSubmit}>Add Item</button>

//         <hr />
//         <h3>🧾 Already Added Items</h3>
//         {items.length === 0 ? (
//           <p>No items added yet.</p>
//         ) : (
//           items.map((item) => (
//             <div
//               key={item.id}
//               style={{
//                 border: '1px solid #ccc',
//                 padding: '10px',
//                 marginBottom: '10px',
//               }}
//             >
//               {editItemId === item.id ? (
//                 <>
//                   <strong>{item.name}</strong><br />
//                   <input
//                     type="number"
//                     value={editPrice}
//                     onChange={(e) => setEditPrice(e.target.value)}
//                   /><br /><br />
//                   <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, true)} />
//                   {editImage && (
//                     <img
//                       src={editImage}
//                       alt="edit"
//                       style={{
//                         width: '100px',
//                         height: 'auto',
//                         marginTop: '5px',
//                         borderRadius: '6px',
//                       }}
//                     />
//                   )}
//                   <br />
//                   <button onClick={() => saveEdit(item.id)} style={{ marginRight: '8px' }}>Save</button>
//                   <button onClick={cancelEdit}>Cancel</button>
//                 </>
//               ) : (
//                 <>
//                   <strong>{item.name}</strong> – ₹{item.price}<br />
//                   {item.image && (
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       style={{
//                         width: '100px',
//                         height: 'auto',
//                         borderRadius: '6px',
//                         marginTop: '5px',
//                       }}
//                     />
//                   )}
//                   <br />
//                   <button onClick={() => startEdit(item)} style={{ marginRight: '8px' }}>Edit</button>
//                   <button
//                     onClick={() => handleDelete(item.id)}
//                     style={{ background: 'red', color: 'white' }}
//                   >
//                     Delete
//                   </button>
//                 </>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddItem;

import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import { useNavigate } from 'react-router-dom';


// ⬇️ Manually import images
// import pizzaImg from '../../images/pizza.jpg';
import burgerImg from '../../images/burger.jpg';
// import pastaImg from '../../images/pasta.jpg';
// import biryaniImg from '../../images/biryani.jpg';
// import friesImg from '../../images/fries.jpg';
// import wrapImg from '../../images/wrap.jpg';
// import momosImg from '../../images/momos.jpg';
// import sandwichImg from '../../images/sandwich.jpg';
// import saladImg from '../../images/salad.jpg';
// import icecreamImg from '../../images/icecream.jpg';

// 🔗 Map names to images
const imageMap: Record<string, string> = {
  // pizza: pizzaImg,
  burger: burgerImg,
  // pasta: pastaImg,
  // biryani: biryaniImg,
  // fries: friesImg,
  // wrap: wrapImg,
  // momos: momosImg,
  // sandwich: sandwichImg,
  // salad: saladImg,
  // icecream: icecreamImg,
};

const foodOptions = [
  'Pizza',
  'Burger',
  'Pasta',
  'Biryani',
  'Fries',
  'Wrap',
  'Momos',
  'Sandwich',
  'Salad',
  'Ice Cream',
  'cone'
];

interface Item {
  id: number;
  name: string;
  price: number;
  image: string;
}

const AddItem: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const [price, setPrice] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('items');
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  const getImageByItemName = (name: string): string => {
    const key = name.toLowerCase().replace(/\s+/g, '');
    return imageMap[key] || '';
  };

  const handleSubmit = () => {
    if (!selectedItem || !price) {
      alert('Please select an item and enter price.');
      return;
    }

    if (items.some((item) => item.name === selectedItem)) {
      alert('Item already exists.');
      return;
    }

    const imagePath = getImageByItemName(selectedItem);
    const newItem: Item = {
      id: Date.now(),
      name: selectedItem,
      price: parseFloat(price),
      image: imagePath,
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));

    setSelectedItem('');
    setPrice('');
    alert('Item added successfully!');
  };

  const handleDelete = (id: number) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    localStorage.setItem('items', JSON.stringify(updated));
  };

  const logout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/');
  };

  return (
    <div>
      <AdminNavbar onLogout={logout} isLoggedIn={false} />
      <div style={{ padding: '20px' }}>
        <h2>Add New Item</h2>

        <select
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
        >
          <option value="">-- Select Food Item --</option>
          {foodOptions.map((option) => (
            <option
              key={option}
              value={option}
              disabled={items.some((item) => item.name === option)}
            >
              {option}
            </option>
          ))}
        </select><br /><br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        /><br /><br />

        {selectedItem && (
          <img
            src={getImageByItemName(selectedItem)}
            alt={selectedItem}
            style={{
              width: '150px',
              borderRadius: '8px',
              marginBottom: '10px',
              border: '1px solid #ddd'
            }}
          />
        )}

        <br />
        <button onClick={handleSubmit}>Add Item</button>

        <hr />
        <h3>Already Added Items</h3>
        {items.length === 0 ? (
          <p>No items added yet.</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                marginBottom: '10px',
              }}
            >
              <strong>{item.name}</strong> – ₹{item.price}<br />
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: '100px',
                  borderRadius: '6px',
                  marginTop: '5px',
                  border: '1px solid #aaa'
                }}
              /><br />
              <button
                onClick={() => handleDelete(item.id)}
                style={{
                  background: 'red',
                  color: 'white',
                  padding: '4px 10px',
                  border: 'none',
                  marginTop: '5px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddItem;
