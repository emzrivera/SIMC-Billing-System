import React, { useEffect, useState } from 'react';

function Patients() {
  const [patients, setPatients] = useState([]);

  // fetch patient data from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/')
      .then(response => response.json())
      .then(data => setPatients(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Patients</h1>
      {patients.length > 0 ? (
        patients.map(patient => (
          <div key={patient.patientId}>
            <h2>{patient.name}</h2>
            <p><strong>Procedures:</strong> {patient.procedures.join(', ')}</p>
            <p><strong>Services:</strong> {patient.services.join(', ')}</p>
            <p><strong>Room Usage:</strong> {patient.roomUsage}</p>
          </div>
        ))
      ) : (
        <p>No patient records found.</p>
      )}
    </div>
  );
}

export default Patients;
