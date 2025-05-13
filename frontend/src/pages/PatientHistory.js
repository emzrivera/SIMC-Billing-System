import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PatientHistory.css';
import { FiArrowLeftCircle } from 'react-icons/fi';

const PatientHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (patient?.id) {
      const fetchPayments = async () => {
        try {
          const res = await fetch(`${process.env.REACT_APP_API_URL}/api/payment-records?patientId=${patient.id}`);
          const data = await res.json();
          setPayments(data);
        } catch (err) {
          console.error('Failed to fetch payment history', err);
        }
      };
      fetchPayments();
    }
  }, [patient]);

  if (!patient) return <p style={{ padding: '2rem' }}>No patient data provided.</p>;

  return (
    <div className="container">
      <header>
        <nav>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1); // go back
            }}
            className="back-link"
          >
            <FiArrowLeftCircle size={20} />
            Payment History
          </a>
          <span style={{ margin: '0 6px' }}>/</span>
          <p style={{ display: 'inline' }}>Patient Payment History</p>
        </nav>
      </header>

      <div className="profile">
        <div className="avatar">
          <img src="/patient-avatar.svg" alt="avatar" />
        </div>
        <div className="patient-info">
          <h1>{patient.name}</h1>
          <p>Patient ID: {patient.id}</p>
        </div>
      </div>

      <h2 className="section-title">Patient Payment History</h2>

      <div className="main-section">
        <div className="payment-history">
          {payments.length > 0 ? (
            payments.map((payment, index) => (
              <div key={index} className={`payment-item ${payment.status?.toLowerCase() || ''}`}>
                <div className="payment-box">
                  <div className="payment-top">
                    <div className="payment-info">
                      {/* <span className={`status-label ${payment.status?.toLowerCase() || ''}`}>
                        {payment.status || '—'}
                      </span> */}
                      <span className="amount">₱{(payment.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                    <button className="invoice-btn" onClick={() => navigate(`/invoice/${payment.invoiceId}`)}>
                      View Invoice
                    </button>
                  </div>
                  <div className="payment-bottom">
                    <span>{new Date(payment.paymentDate).toLocaleDateString()}</span>
                    <span>|</span>
                    <span>{payment.invoiceId}</span>
                    {payment.method && (
                      <>
                        <span>|</span>
                        <span>{payment.method}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No transactions found for this patient.</p>
          )}
        </div>

        <div className="history-notes">
          <h3>Notes</h3>
          <textarea placeholder="Enter notes here..."></textarea>
        </div>
      </div>
    </div>
  );
};

export default PatientHistory;
