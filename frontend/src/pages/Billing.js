import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'; 
import './Billing.css'; 
import AddInvoiceModal from '../components/AddInvModal';

import { ReactComponent as AddIcon } from '../assets/add-icon.svg';
import { HiOutlineDotsVertical, HiOutlineSearch  } from 'react-icons/hi';


const Billing = () => {
  const [invoices, setInvoices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterMonth, setFilterMonth] = useState('All');
  const [availableMonths, setAvailableMonths] = useState([]);

  const filteredInvoices = invoices.filter(invoice => {
    const name = invoice.name?.toLowerCase() || '';
    const pid = invoice.patientId?.toLowerCase() || '';
    const id = invoice.id?.toLowerCase() || '';
    const query = searchQuery.toLowerCase();

    const matchesQuery = name.includes(query) || id.includes(query) || pid.includes(query);
    const matchesStatus = filterStatus === 'All' || invoice.status === filterStatus;
    const invoiceMonth = new Date(invoice.date).toLocaleDateString('en-US', { month: 'long' });
    const matchesMonth = filterMonth === 'All' || invoiceMonth === filterMonth;

    return matchesQuery && matchesStatus && matchesMonth;
  });

  console.log('Searching:', searchQuery);
  console.log('Filtered:', filteredInvoices.length);


  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        // await fetch(`${process.env.REACT_APP_API_URL}/api/billing/generate`);
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/billing-records`);
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

        const months = [...new Set(fetched.map(item => {
        const date = new Date(item.date);
        return date.toLocaleDateString('en-US', { month: 'long' });
      }))];
      setAvailableMonths(months);


      } catch (err) {
        console.error('Failed to fetch billing data:', err);
      }
    };
  
    fetchInvoices();
  }, []);
  

  const getStatusClass = (status) => {
    switch (status) {
      case 'Unpaid' : return 'status unpaid';
      case 'Paid': return 'status paid';
      case 'Partial': return 'status partial';
      case 'Voided': return 'status voided';
      default: return 'status';
    }
  };

  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div>

      <div className="main-layout">
  
        <div className="patient-billing-container">
          <div className="stats-container">
            <div className="stat-card gray">
              <p>Revenue Today</p>
              <span>₱42,000.00</span>
              <p>Billed as of now</p>
            </div>
            <div className="stat-card blue">
              <div>
                <p>Unpaid Invoices</p>
                <span>{invoices.filter(i => i.status !== 'Paid').length}</span>
              </div>
               <div className="divider" />
              <div>
                <p>Outstanding Balance</p>
                <span>
                  ₱{invoices.reduce((sum, i) => sum + i.balance, 0).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="stat-card gray">
              <p>Payments Today</p>
              <span>
                ₱{invoices.reduce((sum, i) => sum + i.paid, 0).toLocaleString()}
              </span>
              <p>Collected as of now</p>
            </div>
          </div>

          <div className="invoice-section">
            <span className="invoice-title">Invoice List</span>
            <div className="invoice-header">
              
            <div className="search-and-filters">
              <div className="search-wrapper">
                <HiOutlineSearch className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search patient or invoice..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="billing-filters">
                <p> Filter by</p>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="All">Status (All)</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Paid">Paid</option>
                <option value="Partial">Partial</option>
                <option value="Voided">Voided</option>
              </select>

              <select value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}>
                <option value="All">Month (All)</option>
                {availableMonths.map((month, idx) => (
                  <option key={idx} value={month}>{month}</option>
                ))}
              </select>
            </div>
             
             </div>
              
              <div className="billing-actions">
                {/* <button className="billing-export-btn"> <ExportIcon className="icon" /> Export CSV</button> */}
                <button className="billing-add-btn" onClick={() => setShowAddModal(true)}> <AddIcon className="icon" /> Add Invoice</button>
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
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan="8" className="no-records-found">
                    No records found.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((invoice, index) => (
                  <tr key={index}>
                    <td>{invoice.id}</td>
                    <td>{invoice.name}</td>
                    <td>{invoice.patientId}</td>
                    <td>₱{invoice.total.toLocaleString()}</td>
                    <td>₱{invoice.paid.toLocaleString()}</td>
                    <td>₱{invoice.balance.toLocaleString()}</td>
                    <td><span className={getStatusClass(invoice.status)}>{invoice.status}</span></td>
                    <td>{invoice.date}</td>
                    <td className="icon-cell">
                      <NavLink to={`/invoice/${invoice.id}`} style={{ display: 'inline-flex', alignItems: 'center'}}>
                        <HiOutlineDotsVertical size={20} color="#555" />
                      </NavLink>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            </table>
          </div>
        </div>
      </div>

      {showAddModal && <AddInvoiceModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
};

export default Billing;
