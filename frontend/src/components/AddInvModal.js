import React, { useEffect, useState } from 'react';
import './AddInvModal.css';
import { HiOutlineTrash } from 'react-icons/hi';
import { FaStethoscope, FaPills, FaBed } from 'react-icons/fa';
import { ReactComponent as AddIcon } from '../assets/add-icon-blue.svg';

const AddInvoiceModal = ({ onClose }) => {
  const [patientId, setPatientId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [medicalServices, setMedicalServices] = useState(['']);
  const [roomCharge, setRoomCharge] = useState({ type: '', days: 0 });
  const [medicines, setMedicines] = useState([{ name: '', quantity: 1, price: 0 }]);
  const [inventory, setInventory] = useState([]);
  const [patients, setPatients] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  const serviceOptions = ['Consultation', 'X-Ray', 'Blood Test', 'MRI', 'Surgery'];
  const roomOptions = ['VIP', 'Private Room', 'Semi-Private', 'Ward'];

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_PHARMACY_API_URL}`); 
        const data = await res.json();
        setInventory(data);
      } catch (err) {
        console.error('Failed to fetch inventory');
      }
    };

    const fetchPatients = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_PATIENT_API_URL}`);
        const data = await res.json();
        setPatients(data);
      } catch (err) {
        console.error('Failed to fetch patients');
      }
    };

    const fetchPrescriptions = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_PRESCRIPTION_API_URL}`);
        const data = await res.json();
        setPrescriptions(data);
      } catch (err) {
        console.error('Failed to fetch prescriptions');
      }
    };

    fetchInventory();
    fetchPatients();
    fetchPrescriptions();
  }, []);

  useEffect(() => {
    const matched = patients.find(p => p.patientId === patientId);
    if (matched) {
      setPatientName(`${matched.firstName} ${matched.lastName}`);
    } else {
      setPatientName('');
    }
  }, [patientId, patients]);

  
  const handleServiceChange = (value, index) => {
    const updated = [...medicalServices];
    updated[index] = value;
    setMedicalServices(updated);
  };

  const addService = () => setMedicalServices([...medicalServices, '']);
  const removeService = (index) => setMedicalServices(medicalServices.filter((_, i) => i !== index));

  // const handleMedicineChange = (index, field, value) => {
  //   const updated = [...medicines];
  //   updated[index][field] = value;

  //   if (field === 'name') {
  //     const match = inventory.find(m => m.name.toLowerCase() === value.toLowerCase());
  //     updated[index].price = match ? match.price : 0;
  //   }
  //   setMedicines(updated);
  // };

  useEffect(() => {
    const matched = patients.find(p => p.patientId === patientId);
    if (matched) {
      setPatientName(`${matched.firstName} ${matched.lastName}`);
    } else {
      setPatientName('');
    }
    
    const patientPrescription = prescriptions.find(p => p.patientId === patientId);
      if (patientPrescription && patientPrescription.inscription.length > 0) {
        const formattedMeds = patientPrescription.inscription.map(item => ({
          name: item.name,
          quantity: item.quantity,
        }));
        setMedicines(formattedMeds);
      } else {
        setMedicines([]);
      }
  }, [patientId, patients, prescriptions]);


  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      patientId,
      roomType: roomCharge.type,
      noOfDays: parseInt(roomCharge.days),
      medicalServices: medicalServices.filter(s => s.trim() !== ''),
      medicines: medicines.map(m => ({
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
      onClose();
      window.location.reload();
    } catch (err) {
      alert('Failed to submit invoice');
      console.error(err);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="add-inv-modal">
        <div className="modal-header">
            <span className='add-inv-title'>Add Invoice</span>
            {patientName && <span className="invoice-info">({patientName})</span>}
          <button onClick={onClose}>×</button>
        </div>
        <hr className="line-separator" />

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="patient-id">
            <label>Patient ID</label>
            <select value={patientId} onChange={(e) => setPatientId(e.target.value)} required>
              <option value="">Select Patient</option>
              {patients.map(p => (
                <option key={p.patientId} value={p.patientId}>
                  {p.patientId}
                  – {p.firstName} {p.lastName}
                </option>
              ))}
            </select>
          </div>

          <section>
            <h4><FaStethoscope className="section-icon" /> Medical Services</h4>
            {medicalServices.map((service, idx) => (
              <div className="input-row" key={idx}>
                <select value={service} onChange={(e) => handleServiceChange(e.target.value, idx)}>
                  <option value="">Select Service</option>
                  {serviceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <button type="button" className="delete-item-btn" onClick={() => removeService(idx)}><HiOutlineTrash className="icon" /> </button>
              </div>
            ))}
            <button type="button" className="add-item-btn" onClick={addService}><AddIcon className="icon" /> Add Item</button>
          </section>

          <section>
            <h4><FaBed className="section-icon" /> Room Charge</h4>
            <div className="input-row">
              <div className="room-type">
                <label>Type</label>
                <select
                  value={roomCharge.type}
                  onChange={(e) => setRoomCharge({ ...roomCharge, type: e.target.value })}
                  required
                >
                  <option value="">Select Room</option>
                  {roomOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div className="days">
                <label>No. of Days</label>
                <input
                  type="number"
                  min="1"
                  value={roomCharge.days}
                  onChange={(e) => setRoomCharge({ ...roomCharge, days: Number(e.target.value) })}
                  required
                />
              </div>
            </div>
          </section>

          <section>
            <h4><FaPills className="section-icon" /> Prescribed Medicines</h4>
            {prescriptions
              .filter(p => p.patientId === patientId)
              .map((prescription, idx) => (
                <div className="input-row" key={idx}>
                  <div className="med-name">
                    <label>Medicine</label>
                    <input type="text" value={prescription.name} readOnly />
                  </div>
                  <div className="quantity">
                    <label>Qty</label>
                    <input type="number" value={prescription.quantity} readOnly />
                  </div>
                </div>
              ))}
          </section>

          <div className="modal-actions">
            <button type="submit" className="submit-btn">Submit Invoice</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInvoiceModal;
