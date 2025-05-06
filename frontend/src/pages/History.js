import React, { useEffect, useState } from 'react';
import './history.css';

export default function PaymentHistory() {
  const [dateTime, setDateTime] = useState({ date: '', time: '' });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dateString = now.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      });
      const timeString = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
      setDateTime({ date: dateString, time: timeString });
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="history-layout-wrapper">
      <header>
        <nav>
          <div className="history-logo">
            <a href="#"><img src="/frontend/public/history-logo-combined.svg" alt="SIMC Logo" /></a>
          </div>
          <div className="history-right-side">
            <div className="history-date-time">
              <span className="the-date">{dateTime.date}</span>
              <span className="the-time">{dateTime.time}</span>
            </div>
            <div className="history-avatar">
              <a href="#"><img src="/frontend/public/history-avatar.svg" alt="Avatar" /></a>
            </div>
          </div>
        </nav>
      </header>

      <aside className="history-sidebar">
        <ul className="history-nav-links">
          <li className="history-billing"><a href="#"><img src="/frontend/public/history-icon-1.svg" alt="Billing Icon" /> Patient Billing</a></li>
          <li className="history-history"><a href="#"><img src="/frontend/public/history-icon-2.svg" alt="History Icon" /> Payment History</a></li>
          <li className="history-revenue"><a href="#"><img src="/frontend/public/history-icon-3.svg" alt="Reports Icon" /> Revenue Reports</a></li>
        </ul>
      </aside>

      <main className="history-main-content">
        <div className="history-payment-summary">
          <div className="history-status history-paid">
            <div className="history-status-header">
              <p>Paid Payments</p>
              <p className="history-count-1">(99)</p>
            </div>
            <h2 className="history-amount">₱ 246,987.89</h2>
          </div>
          <div className="history-status history-partial">
            <div className="history-status-header">
              <p>Partial Payments</p>
              <p className="history-count-2">(56)</p>
            </div>
            <h2 className="history-amount">₱ 135,786.56</h2>
          </div>
          <div className="history-status history-overdue">
            <div className="history-status-header">
              <p>Overdue Payments</p>
              <p className="history-count-3">(8)</p>
            </div>
            <h2 className="history-amount">₱ 76,678.12</h2>
          </div>
        </div>

        <h2 className="history-title">Payment History</h2>

        <div className="history-search-bar">
          <div className="history-search-wrapper">
            <input type="text" placeholder="Search patient name" />
            <img src="/frontend/public/history-icon-4.svg" alt="Search Icon" />
          </div>
          <p>Filter by</p>
          <select>
            <option>Payment (All)</option>
            <option>Cash</option>
            <option>Online</option>
            <option>Bank Transfer</option>
          </select>
          <select>
            <option>Date (All)</option>
            {['January','February','March','April','May','June','July','August','September','October','November','December'].map(month => (
              <option key={month}>{month}</option>
            ))}
          </select>
          <select>
            <option>Status (All)</option>
            <option>Voided</option>
            <option>Partial</option>
            <option>Paid</option>
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Patient ID</th>
              <th>Total Amount</th>
              <th>Amount Paid</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Payment Date</th>
              <th>History</th>
            </tr>
          </thead>
          <tbody>
            {[{
              name: 'Anita Reyes', id: 'IPT-2038', total: '₱3,100.00', paid: '₱1,000.00', method: 'Cash', status: 'Voided', date: 'Apr 18, 2025'
            }, {
              name: 'Allan Soriano', id: 'IPT-4067', total: '₱3,100.00', paid: '₱1,000.00', method: 'Cash', status: 'Partial', date: 'Apr 18, 2025'
            }, {
              name: 'Alex Great', id: 'IPT-3092', total: '₱3,100.00', paid: '₱1,000.00', method: 'Online', status: 'Paid', date: 'Apr 18, 2025'
            }, {
              name: 'Alexa Rose Yu', id: 'IPT-3092', total: '₱3,100.00', paid: '₱1,000.00', method: 'Bank Transfer', status: 'Paid', date: 'Apr 18, 2025'
            }].map((patient, idx) => (
              <tr key={idx}>
                <td>{patient.name}</td>
                <td>{patient.id}</td>
                <td>{patient.total}</td>
                <td>{patient.paid}</td>
                <td>{patient.method}</td>
                <td><div className={`history-table-${patient.status.toLowerCase()}`}>{patient.status}</div></td>
                <td>{patient.date}</td>
                <td className="history-view"><a href="#">View History →</a></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="history-pagination">
          <span className="page-arrow">&lt;</span>
          <span className="page-number active">1</span>
          <span className="page-number">2</span>
          <span className="page-number">3</span>
          <span className="page-number">4</span>
          <span className="page-arrow">&gt;</span>
        </div>
      </main>
    </div>
  );
}
