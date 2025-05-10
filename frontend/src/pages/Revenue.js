import React from 'react';
import './Revenue.css';

const Revenue = () => {
  return (
    <div className="revenue-container">
      <header className="revenue-header">
        <h1>Revenue Reports</h1>
        <button className="export-button">Export CSV</button>
      </header>

      <div className="revenue-cards">
        <div className="card">
          <p>Total Revenue</p>
          <h2>₱72,250,000</h2>
          <span className="increase">↑ 8.9% in 30 days</span>
        </div>
        <div className="card light">
          <p>Total HMO Charges (Paid)</p>
          <h2>₱72,250,000</h2>
          <span className="increase blue">↑ 8.9%</span>
        </div>
        <div className="card">
          <p>Total Discounts Given</p>
          <h2>₱72,250,000</h2>
          <span className="increase">↑ 8.9%</span>
        </div>
      </div>

      <div className="summary-section">
        <div className="summary-table">
          <h3>Summary by Date</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Total Billed</th>
                <th>Total Paid</th>
                <th>Total Discount</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>2025-04-03</td><td>₱300,100.00</td><td>₱3,00100.00</td><td>₱3,100.00</td></tr>
              <tr><td>2025-04-02</td><td>₱300,100.00</td><td>₱3,00100.00</td><td>₱3,100.00</td></tr>
              <tr><td>2025-04-01</td><td>₱300,100.00</td><td>₱3,00100.00</td><td>₱3,100.00</td></tr>
            </tbody>
          </table>
        </div>

        <div className="income-sources">
          <h3>Revenue Income Sources</h3>
          <div className="donut-chart">
            {/* Placeholder — replace with a charting library */}
            <div className="chart-circle">₱72,250,000</div>
            <ul>
              <li>HMO: ₱35,000</li>
              <li>Cash: ₱75,000</li>
              <li>Discounts: ₱10,000</li>
            </ul>
          </div>
          <p className="help-note">❤️ ₱10,000 in discounts helped 85 patients this month.</p>
        </div>
      </div>

      <div className="discounts">
        <h3>Discounts</h3>
        <div className="discount-boxes">
          <div className="discount-card">
            <p>Senior Citizen</p>
            <h4>₱6,500.00</h4>
            <span>Count: 40</span>
          </div>
          <div className="discount-card">
            <p>Person With Disability (PWD)</p>
            <h4>₱3,500.00</h4>
            <span>Count: 20</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
