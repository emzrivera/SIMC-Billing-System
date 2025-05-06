import React from 'react';
import './Billing.css'; 
import '../components/TopNavBar.js'; 


const Billing = () => {
  const invoices = [
    {
      id: 'INV-00987',
      name: 'Anita Reyes',
      patientId: 'IPT-2038',
      total: 3100,
      paid: 1000,
      balance: 2100,
      status: 'Voided',
      date: 'Apr 18, 2025',
    },
    {
      id: 'INV-00986',
      name: 'Allan Soriano',
      patientId: 'IPT-4067',
      total: 3100,
      paid: 1000,
      balance: 2100,
      status: 'Partial',
      date: 'Apr 18, 2025',
    },
    {
      id: 'INV-00985',
      name: 'Allan Soriano',
      patientId: 'IPT-3092',
      total: 3100,
      paid: 1000,
      balance: 2100,
      status: 'Paid',
      date: 'Apr 18, 2025',
    },
    {
      id: 'INV-00985',
      name: 'Allan Soriano',
      patientId: 'IPT-3092',
      total: 3100,
      paid: 1000,
      balance: 2100,
      status: 'Paid',
      date: 'Apr 18, 2025',
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Paid':
        return 'status paid';
      case 'Partial':
        return 'status partial';
      case 'Voided':
        return 'status voided';
      default:
        return 'status';
    }
  };

  return (
    <div className="patient-billing-container">
      <div className="stats-container">
        <div className="stat-card blue">
          <p>Unpaid Invoices</p>
          <h3>27</h3>
          <p>Outstanding Balance</p>
          <h2>₱128,300.00</h2>
        </div>
        <div className="stat-card gray">
          <p>Payments Today</p>
          <h2>₱21,300.00</h2>
          <p>Collected as of now</p>
        </div>
        <div className="stat-card gray">
          <p>Pending HMO Claims</p>
          <h2>₱42,000.00</h2>
          <p>Not yet cleared</p>
        </div>
      </div>

      <div className="invoice-section">
        <div className="invoice-header">
          <h3>Invoice List</h3>
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

        <div className="pagination"> &lt; 1 2 3 4 … &gt; </div>
      </div>
    </div>
  );
};

export default Billing;
