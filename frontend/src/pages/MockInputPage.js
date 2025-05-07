import React from 'react';
import PatientForm from '../components/MockPatientForm';
import MedicineForm from '../components/MockMedicineForm';

const MockInputPage = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Mock Data Input</h2>
      <PatientForm />
      <hr />
      <MedicineForm />
    </div>
  );
};

export default MockInputPage;