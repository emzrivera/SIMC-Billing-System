import React, { useEffect, useState } from 'react';
import '../pages/css/MockForm.css';

const AddInvoice = () => {
  const [formData, setFormData] = useState({
    patientID: '',
    roomType: '',
    noOfDays: '',
    medicalServices: '',
    medicines: [{ name: '', quantity: '', price: 0 }]
  });

  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await fetch(`${process.env.PHARMACY_API_URL}`);
        const data = await res.json();
        setInventory(data);
      } catch (err) {
        console.error('Failed to fetch inventory');
      }
    };

    fetchInventory();
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMedicineChange = (index, field, value) => {
    const updatedMeds = [...formData.medicines];
    updatedMeds[index][field] = value;

    if (field === 'name') {
      const match = inventory.find(m => m.name.toLowerCase() === value.toLowerCase());
      updatedMeds[index].price = match ? match.price : 0;
    }

    setFormData({ ...formData, medicines: updatedMeds });
  };

  const addMedicine = () => {
    setFormData({ ...formData, medicines: [...formData.medicines, { name: '', quantity: '', price: 0 }] });
  };

  const removeMedicine = index => {
    const updated = formData.medicines.filter((_, i) => i !== index);
    setFormData({ ...formData, medicines: updated });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      patientId: formData.patientID,
      roomType: formData.roomType,
      noOfDays: parseInt(formData.noOfDays),
      medicalServices: formData.medicalServices.split(',').map(s => s.trim()),
      medicines: formData.medicines.map(m => ({
        name: m.name.trim(),
        quantity: parseInt(m.quantity),
        unitPrice: m.price
      }))
    };

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/billing-records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      alert(data.message || 'Invoice created');
    } catch (err) {
      alert('Failed to submit invoice');
      console.error(err);
    }
  };

  return (
    <form className='mock-form' onSubmit={handleSubmit}>
      <h3>Add Invoice</h3>

      <input name="patientID" placeholder="Patient ID" value={formData.patientID} onChange={handleChange} required />
      <input name="roomType" placeholder="Room Type (VIP, Ward...)" onChange={handleChange} required />
      <input name="noOfDays" placeholder="No. of Days" onChange={handleChange} required />
      <input name="medicalServices" placeholder="Medical Services (comma separated)" onChange={handleChange} required />

      <label style={{ marginTop: '1rem' }}>Medicines:</label>
      {formData.medicines.map((med, index) => (
        <div key={index} style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
          <input
            placeholder="Medicine name"
            value={med.name}
            onChange={e => handleMedicineChange(index, 'name', e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={med.quantity}
            onChange={e => handleMedicineChange(index, 'quantity', e.target.value)}
            required
          />
          <span>₱{med.price || 0}</span>
          {formData.medicines.length > 1 && (
            <button type="button" onClick={() => removeMedicine(index)} style={{ padding: '0.2rem 0.6rem' }}>✕</button>
          )}
        </div>
      ))}
      <button type="button" onClick={addMedicine} style={{ marginTop: '0.5rem' }}>+ Add Medicine</button>
      <button type="submit" style={{ marginTop: '1rem' }}>Submit Invoice</button>
    </form>
  );
};

export default AddInvoice;
