import React, { useEffect, useState } from 'react';

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PHARMACY_API_URL}`)
      .then(res => res.json())
      .then(data => {
        setInventory(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading inventory...</p>;

  return (
    <div>
      <h2>Inventory List</h2>
      <ul>
        {inventory.map((item, index) => (
          <li key={index}>{item.name} — price: {item.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryPage;
