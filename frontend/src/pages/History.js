import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './History.css';
import { HiOutlineSearch } from 'react-icons/hi';

const getMonthFromDate = (dateStr) => {
  const options = { month: 'long' };
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', options);
};

const PaymentHistory = () => {
    const [paymentData, setPaymentData] = useState([]);
    const [availableMonths, setAvailableMonths] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterMethod, setFilterMethod] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterDate, setFilterDate] = useState('All');

    useEffect(() => {
    const fetchData = async () => {
    try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/payment-records`);
    const data = await res.json();

    const formatted = data.map((p) => ({
      name: p.patientName,
      id: p.patientId,
      paid: `₱${p.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      balance: `₱${p.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      method: p.method || 'Cash',
      status: getPaymentStatus(p.balance),
      date: new Date(p.paymentDate).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
      }),
      rawDate: p.paymentDate,
    }));

    setPaymentData(formatted);

    const months = [...new Set(formatted.map(item => getMonthFromDate(item.rawDate)))];
    setAvailableMonths(months);
    } catch (err) {
    console.error('Error fetching payment history:', err);
    }
  };

  fetchData();
}, []);

const getPaymentStatus = (balance) => {
  if (balance <= 0) return 'Paid';
  if (balance > 0) return 'Partial';
  return 'Unknown';
};

const filteredData = paymentData.filter((payment) => {
  const matchesSearch = payment.name.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesMethod = filterMethod === 'All' || payment.method === filterMethod;
  const matchesStatus = filterStatus === 'All' || payment.status === filterStatus;
  const matchesDate =
  filterDate === 'All' ||
  getMonthFromDate(payment.rawDate).toLowerCase() === filterDate.toLowerCase();
  return matchesSearch && matchesMethod && matchesStatus && matchesDate;
});

  return (
    <div className="history-layout-wrapper">
    <main className="history-main-content">
    <h2 className="history-title">Payment History</h2>

        <div className="history-search-bar">
          <div className="history-search-wrapper">
            <HiOutlineSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search patient name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <p>Filter by</p>

          <select value={filterMethod} onChange={(e) => setFilterMethod(e.target.value)}>
            <option value="All">Payment (All)</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
          </select>

          <select value={filterDate} onChange={(e) => setFilterDate(e.target.value)}>
            <option value="All">Month (All)</option>
            {availableMonths.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>

          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">Status (All)</option>
            <option value="Voided">Voided</option>
            <option value="Partial">Partial</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        {filteredData.length === 0 ? (
          <p style={{ marginTop: '2rem', textAlign: 'center' }}>No records found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Patient ID</th>
                <th>Amount Paid</th>
                <th>Balance Due</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Payment Date</th>
                <th>History</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((payment, index) => (
                <tr key={index}>
                  <td>{payment.name}</td>
                  <td>{payment.id}</td>
                  <td>{payment.paid}</td>
                  <td>{payment.balance}</td>
                  <td>{payment.method}</td>
                  <td>
                    <div className={`history-table-${payment.status.toLowerCase()}`}>
                      {payment.status}
                    </div>
                  </td>
                  <td>{payment.date}</td>
                  <td className="history-view">
                    <Link to="/history/patient-history" state={{ patient: payment }}>
                      View History →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* <div className="history-pagination">
          <span className="page-arrow">&lt;</span>
          <span className="page-number active">1</span>
          <span className="page-number">2</span>
          <span className="page-number">3</span>
          <span className="page-number">4</span>
          <span className="page-arrow">&gt;</span>
        </div> */}
      </main>
    </div>
    );
};

export default PaymentHistory;