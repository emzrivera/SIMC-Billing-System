import React, { useEffect, useState } from 'react';
import './Billing.css';
import TopNavBar from '../components/TopNavBar';
import SideNavBar from '../components/SideNavBar';

const Billing = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/billing');
        const records = await res.json();

        const fetched = records.map(data => {
          const total = data.totalBill;
          const paid = 0;
          const balance = total - paid;

          return {
            id: `INV-${Math.floor(Math.random() * 90000 + 10000)}`,
            name: data.patientName,
            patientId: data.patientID,
            total,
            paid,
            balance,
            status: balance === 0 ? 'Paid' : paid > 0 ? 'Partial' : paid === 0? 'Unpaid' : 'Voided',
            date: new Date().toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric'
            })
          };
        });

        setInvoices(fetched);
      } catch (err) {
        console.error('❌ Failed to fetch billing data:', err);
      }
    };

    fetchInvoices();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Unpaid' : return 'status undpaid';
      case 'Paid': return 'status paid';
      case 'Partial': return 'status partial';
      case 'Voided': return 'status voided';
      default: return 'status';
    }
  };

  return (
    <div>
      <TopNavBar />
      <div className="main-layout">
        <SideNavBar />
        <div className="patient-billing-container">
          <div className="stats-container">
            <div className="stat-card blue">
              <div>
                <p>Unpaid Invoices</p>
                <h1>{invoices.filter(i => i.status !== 'Paid').length}</h1>
              </div>
              <div>
                <p>Outstanding Balance</p>
                <h1>
                  ₱{invoices.reduce((sum, i) => sum + i.balance, 0).toLocaleString()}
                </h1>
              </div>
            </div>
            <div className="stat-card gray">
              <p>Payments Today</p>
              <h1>
                ₱{invoices.reduce((sum, i) => sum + i.paid, 0).toLocaleString()}
              </h1>
              <p>Collected as of now</p>
            </div>
            <div className="stat-card gray">
              <p>Pending HMO Claims</p>
              <h1>₱42,000.00</h1>
              <p>Not yet cleared</p>
            </div>
          </div>

          <div className="invoice-section">
            <span className="invoice-title">Invoice List</span>
            <div className="invoice-header">
              <input type="text" placeholder="Search patient or invoice..." />
              <div className="actions">
                <button className="export-btn">Export CSV</button>
                <button className="add-btn">Add Invoice</button>
              </div>
            </div>

            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Invoice No.</th>
                  <th>Patient Name</th>
                  <th>Patient ID</th>
                  <th>Total Amount</th>
                  <th>Amount Paid</th>
                  <th>Balance Due</th>
                  <th>Status</th>
                  <th>Invoice Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, index) => (
                  <tr key={index}>
                    <td>{invoice.id}</td>
                    <td>{invoice.name}</td>
                    <td>{invoice.patientId}</td>
                    <td>₱{invoice.total.toLocaleString()}</td>
                    <td>₱{invoice.paid.toLocaleString()}</td>
                    <td>₱{invoice.balance.toLocaleString()}</td>
                    <td><span className={getStatusClass(invoice.status)}>{invoice.status}</span></td>
                    <td>{invoice.date}</td>
                    <td>⋮</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
