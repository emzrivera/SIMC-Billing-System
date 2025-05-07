import React, { useState } from 'react';
import '../pages/css/MockForm.css';

const PatientForm = () => {
  const [formData, setFormData] = useState({
    patientID: '',
    patientName: '',
    roomType: '',
    noOfDays: '',
    medicalServices: '',
    medicines: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      ...formData,
      noOfDays: parseInt(formData.noOfDays),
      medicalServices: formData.medicalServices.split(',').map(s => s.trim()),
      medicines: formData.medicines.split(',').map(m => {
        const [name, quantity] = m.split(':');
        return { name: name.trim(), quantity: parseInt(quantity.trim()) };
      })
    };

    try {
      const res = await fetch('http://localhost:5000/api/mock/patient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert('Failed to submit patient data');
    }
  };

  return (
    <form className='mock-form' onSubmit={handleSubmit}>
      <h3>Patient Record</h3>
      <input name="patientID" placeholder="Patient ID" onChange={handleChange} required />
      <input name="patientName" placeholder="Patient Name" onChange={handleChange} required />
      <input name="roomType" placeholder="Room Type" onChange={handleChange} required />
      <input name="noOfDays" placeholder="No. of Days" onChange={handleChange} required />
      <input name="medicalServices" placeholder="Medical Services (comma separated)" onChange={handleChange} required />
      <input name="medicines" placeholder="Medicines (name:qty, comma separated)" onChange={handleChange} required />
      <button type="submit">Submit Patient</button>
    </form>
  );
};

export default PatientForm;
