import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PatientHistory.css';
import { FiArrowLeftCircle } from 'react-icons/fi';

const PatientHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    if (patient?.id) {
      const fetchInvoices = async () => {
        try {
          const res = await fetch(`${process.env.REACT_APP_API_URL}/api/billing-records`);
          const data = await res.json();
          const filtered = data.filter(inv => inv.patientId === patient.id);
          setInvoices(filtered);
        } catch (err) {
          console.error('Failed to fetch invoice history', err);
        }
      };
      fetchInvoices();
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
              navigate(-1);
            }}
            className="back-link"
          >
            <FiArrowLeftCircle size={20} />
            Invoice History
          </a>
          <span style={{ margin: '0 6px' }}>/</span>
          <p style={{ display: 'inline' }}>Patient Invoice History</p>
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

      <h2 className="section-title">Invoice Records</h2>

      <div className="main-section">
        <div className="payment-history">
          {invoices.length > 0 ? (
            invoices.map((invoice, index) => (
              <div key={index} className={`payment-item ${invoice.status.toLowerCase()}`}>
                <div className="payment-box">
                  <div className="payment-top">
                    <div className="payment-info">
                      <span className={`status-label ${invoice.status.toLowerCase()}`}>
                        {invoice.status}
                      </span>
                      <span className="amount">
                        ₱{(invoice.totalAmount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <button
                      className="invoice-btn"
                      onClick={() => navigate(`/invoice/${invoice.invoiceId}`)}
                    >
                      View Invoice
                    </button>
                  </div>
                  <div className="payment-bottom">
                    <span>{new Date(invoice.invoiceDate).toLocaleDateString()}</span>
                    <span>|</span>
                    <span>{invoice.invoiceId}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No invoice records found for this patient.</p>
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
