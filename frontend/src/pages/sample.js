import React, { useEffect, useState } from 'react';

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://pims-d.onrender.com/inventory')
      .then(response => response.json())
      .then(data => {
        setInventory(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching inventory:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Inventory</h2>
      <ul>
        {inventory.map((item, index) => (
          <li key={index}>
            {item.name} – {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryList;
