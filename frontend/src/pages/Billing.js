import React from 'react';
import { NavLink } from 'react-router-dom'; 
import './Billing.css'; 
import TopNavBar from '../components/TopNavBar.js'; 
import SideNavBar from '../components/SideNavBar.js'; 

import { HiOutlineDotsVertical } from 'react-icons/hi';


const Billing = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        await fetch('http://localhost:5000/api/billing/generate');
        const res = await fetch('http://localhost:5000/api/billing-records');
        const records = await res.json();
        const fetched = records.map((record, index) => {
          const total = record.totalAmount ?? 0;
          const paid = record.amountPaid ?? 0;
          const balance = record.balanceDue ?? 0;
          const invoiceId = record.invoiceId || `INV-${String(index + 1).padStart(4, '0')}`;
  
          return {
            id: invoiceId,
            name: record.patientName || 'Unknown',
            patientId: record.patientId || 'Unknown',
            total,
            paid,
            balance,
            status: record.status || 'Unpaid',
            date: record.invoiceDate
              ? new Date(record.invoiceDate).toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric', year: 'numeric'
                })
              : 'Unknown'
          };
        });
  
        setInvoices(fetched);
      } catch (err) {
        console.error('Failed to fetch billing data:', err);
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
