import React, { useState } from 'react';

const MedicineForm = () => {
  const [formData, setFormData] = useState({ name: '', price: '' });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/mock/medicine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, price: parseFloat(formData.price) })
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert('Failed to submit medicine data');
    }
  };

  return (
    <form className='mock-form' onSubmit={handleSubmit}>
      <h3>Medicine Inventory</h3>
      <input name="name" placeholder="Medicine Name" onChange={handleChange} required />
      <input name="price" placeholder="Price" type="number" step="0.01" onChange={handleChange} required />
      <button type="submit">Submit Medicine</button>
    </form>
  );
};

export default MedicineForm;
