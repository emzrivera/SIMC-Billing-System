import React, { useEffect } from 'react';
import './history.css';  // Import the CSS file

const PaymentHistory = () => {

  // Function to update date/time every minute
  const updateDateTime = () => {
    const now = new Date();
    const dateString = now.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });

    const timeString = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });

    document.getElementById('date-time').innerHTML = `
      <span class="the-date">${dateString}</span>
      <span class="the-time">${timeString}</span>`;
  };

  useEffect(() => {
    updateDateTime();
    setInterval(updateDateTime, 60000);
  }, []);

  return (
    <div className="history-layout-wrapper">
      <header>
        <nav>
          <div className="history-logo">
            <a href="#">
              <img src="/history-logo-combined.svg" alt="SIMC Logo" />
            </a>
          </div>
          <div className="history-right-side">
            <div className="history-date-time" id="date-time"></div>
            <div className="history-avatar">
              <a href="#">
                <img src="/history-avatar.svg" alt="Avatar" />
              </a>
            </div>
          </div>
        </nav>
      </header>

      <div className="history-layout-wrapper">
        <aside className="history-sidebar">
          <ul className="history-nav-links">
            <li className="history-billing">
              <a href="#">
                <img src="/history-icon-1.svg" alt="Billing Icon" /> Patient Billing
              </a>
            </li>
            <li className="history-history">
              <a href="#">
                <img src="/history-icon-2.svg" alt="History Icon" /> Payment History
              </a>
            </li>
            <li className="history-revenue">
              <a href="#">
                <img src="/history-icon-3.svg" alt="Reports Icon" /> Revenue Reports
              </a>
            </li>
          </ul>
        </aside>

        <main className="history-main-content">
          <h2 className="history-title">Payment History</h2>
          <div className="history-search-bar">
            <div className="history-search-wrapper">
              <input type="text" placeholder="Search patient name" />
              <img src="/history-icon-4.svg" alt="Search Icon" />
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
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>October</option>
              <option>November</option>
              <option>December</option>
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
              <tr>
                <td>Anita Reyes</td>
                <td>IPT-2038</td>
                <td>₱3,100.00</td>
                <td>₱1,000.00</td>
                <td>Cash</td>
                <td><div className="history-table-voided">Voided</div></td>
                <td>Apr 18, 2025</td>
                <td className="history-view"><a href="#">View History →</a></td>
              </tr>
              <tr>
                <td>Allan Soriano</td>
                <td>IPT-4067</td>
                <td>₱3,100.00</td>
                <td>₱1,000.00</td>
                <td>Cash</td>
                <td><div className="history-table-partial">Partial</div></td>
                <td>Apr 18, 2025</td>
                <td className="history-view"><a href="#">View History →</a></td>
              </tr>
              <tr>
                <td>Alex Great</td>
                <td>IPT-3092</td>
                <td>₱3,100.00</td>
                <td>₱1,000.00</td>
                <td>Online</td>
                <td><div className="history-table-paid">Paid</div></td>
                <td>Apr 18, 2025</td>
                <td className="history-view"><a href="#">View History →</a></td>
              </tr>
              <tr>
                <td>Alexa Rose Yu</td>
                <td>IPT-3092</td>
                <td>₱3,100.00</td>
                <td>₱1,000.00</td>
                <td>Bank Transfer</td>
                <td><div className="history-table-paid">Paid</div></td>
                <td>Apr 18, 2025</td>
                <td className="history-view"><a href="#">View History →</a></td>
              </tr>
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
    </div>
  );
};

export default PaymentHistory;
