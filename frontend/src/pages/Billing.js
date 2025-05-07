import React from 'react';
import { NavLink } from 'react-router-dom'; 
import './Billing.css'; 
import TopNavBar from '../components/TopNavBar.js'; 
import SideNavBar from '../components/SideNavBar.js'; 

import { HiOutlineDotsVertical } from 'react-icons/hi';


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

    <div>
    <div className="patient-billing-container">
      <div className="stats-container">
        <div className="stat-card blue">
          <div>
              <p>Unpaid Invoices</p>
              <h1>27</h1>
          </div>
          <div>
            <p>Outstanding Balance</p>
            <h1>₱128,300.00</h1>
          </div>
        </div>
        <div className="stat-card gray">
          <p>Payments Today</p>
          <h1>₱21,300.00</h1>
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
                <td><NavLink to={`/invoice`} style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <HiOutlineDotsVertical size={20} color="#555" />
                   </NavLink>
                   </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      </div>
    </div>
  );
};

export default Billing;
