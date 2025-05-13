import React, {useState } from 'react';
import './AddInvModal.css';

import { HiOutlineTrash } from 'react-icons/hi';
import { FaChevronLeft, FaStethoscope, FaPills, FaBed, FaMoneyBill, FaBan } from 'react-icons/fa';
import { ReactComponent as AddIcon } from '../assets/add-icon-blue.svg';


    const AddInvoiceModal = ({ onClose }) => {
      const serviceOptions = ['Consultation', 'X-Ray', 'Blood Test', 'MRI'];
      const roomOptions = ['Private', 'Semi-Private', 'Ward', 'Private'];
      const medicineOptions = ['Paracetamol', 'Ibuprofen', 'Celecoxib', 'Amoxicillin'];

      const [medicalServices, setMedicalServices] = useState(['']);
      const [roomCharge, setRoomCharge] = useState({ type: 'Select Room', days: 0 });
      const [medicines, setMedicines] = useState([{ name: 'Select Medicine', qty: 0 }]);

      const handleServiceChange = (value, index) => {
        const updated = [...medicalServices];
        updated[index] = value;
        setMedicalServices(updated);
      };

      const addService = () => setMedicalServices([...medicalServices, '']);
      const removeService = (index) => setMedicalServices(medicalServices.filter((_, i) => i !== index));

      const handleMedicineChange = (index, field, value) => {
        const updated = [...medicines];
        updated[index][field] = value;
        setMedicines(updated);
      };

      const addMedicine = () => setMedicines([...medicines, { type: 'Paracetamol', days: 1 }]);
      const removeMedicine = (index) => setMedicines(medicines.filter((_, i) => i !== index));

      const handleSubmit = (e) => {
        e.preventDefault();
        const invoiceData = {
          medicalServices,
          roomCharge,
          medicines,
        };
        console.log('Submitting Invoice:', invoiceData);
        onClose();
      };


    return (
      <div className="modal-backdrop">
        <div className="add-inv-modal">

          <div className="modal-header-wrapper">
          <div className="modal-header">
            <div className="title">
              <span className="modal-title">Add Invoice</span>
              <span className="invoice-info">INV-</span>
              </div>
              <button onClick={onClose}>×</button>  
          </div>
          <hr className="line-separator" />
        </div>
        
          <form onSubmit={handleSubmit} className="modal-form">
          
          <div className="patient-id">
            <label>Patient ID</label>
            <input type="text" placeholder="PID -" />
          </div>

          {/* Medical Services */}
          <section>
            <h4><FaStethoscope className="section-icon" /> Medical Services</h4>
            {medicalServices.map((service, idx) => (
              <div className="input-row" key={idx}>
                <select
                  value={service}
                  onChange={(e) => handleServiceChange(e.target.value, idx)}
                >
                  <option value="">Select Service</option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <button type="button" className="delete-item-btn" onClick={() => removeService(idx)}><HiOutlineTrash className="icon" /> </button>
              </div>
            ))}
            <button type="button" className="add-item-btn" onClick={addService}><AddIcon className="icon" /> Add Item</button>
          </section>

          {/* Room Charge */}
          <section>
            <h4><FaBed className="section-icon" />Room Charge</h4>
            <div className="input-row">

              <div className="room-type">
                 <label>Type</label>
                <select
                  value={roomCharge.type}
                  onChange={(e) => setRoomCharge({ ...roomCharge, type: e.target.value })}
                >
                  {roomOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              
              <div className="days">
                <label>No. of Days</label>
                <input
                  type="number"
                  min="1"
                  value={roomCharge.days}
                  onChange={(e) => setRoomCharge({ ...roomCharge, days: Number(e.target.value) })}
                />
              </div>
            </div>
          </section>

          {/* Medicines */}
          <section>
            <h4><FaPills className="section-icon" /> Medicine</h4>

              <div className="med-header">
                 <label className="name">Name</label>
                 <label className="qty">Qty</label>
              </div>

            {medicines.map((med, idx) => (
              <div className="input-row" key={idx}>

                <select
                  value={med.type}
                  onChange={(e) => handleMedicineChange(idx, 'name', e.target.value)}
                >
                  {medicineOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                             
                <input
                  type="number"
                  min="1"
                  value={med.qty}
                  onChange={(e) => handleMedicineChange(idx, 'qty', Number(e.target.value))}
                />

                <button type="button" className="delete-item-btn" onClick={() => removeMedicine(idx)}><HiOutlineTrash className="icon" /> </button>
              </div>
            ))}
            <button type="button" className="add-item-btn" onClick={addMedicine}><AddIcon className="icon" /> Add Item</button>
          </section>

          {/* Action Buttons */}
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