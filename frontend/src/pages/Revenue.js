import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import './Revenue.css';

import { FaArrowUp, FaHeart } from 'react-icons/fa';

const Revenue = () => {
  const [selectedRange, setSelectedRange] = useState('This Month');

  // State for revenue data
  const [revenueData, setRevenueData] = useState({
    totalRevenue: 72250000,
    hmoCharges: 35000000,
    discounts: 10000000,
    summary: [
      { date: '2025-04-04', billed: 300100, paid: 300100, discount: 3100 },
      { date: '2025-04-03', billed: 300100, paid: 300100, discount: 3100 },
      { date: '2025-04-02', billed: 300100, paid: 300100, discount: 3100 },
      { date: '2025-04-01', billed: 300100, paid: 300100, discount: 3100 },
    ],
    discountBreakdown: [
      { type: 'Senior Citizen', amount: 6500, count: 40 },
      { type: 'Person With Disability (PWD)', amount: 3500, count: 20 }
    ]
  });

  const pieData = [
    { name: 'Cash', value: revenueData.totalRevenue - revenueData.hmoCharges - revenueData.discounts },
    { name: 'HMO', value: revenueData.hmoCharges },
    { name: 'Discounts', value: revenueData.discounts }
  ];

  const COLORS = ['#4dabf7', '#1c7ed6', '#d0ebff'];

  useEffect(() => {
    // Mock API call to update revenue data based on selected range
    const fetchRevenueData = async () => {
      let updatedRevenueData = {
        ...revenueData,
        totalRevenue: 80000000,
        hmoCharges: 40000000,
        discounts: 12000000,
      };
      setRevenueData(updatedRevenueData);
    };

    fetchRevenueData();
  }, [selectedRange]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <select value={selectedRange} onChange={(e) => setSelectedRange(e.target.value)}>
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>
        <button className="export-btn">Export CSV</button>
      </div>

      <div className="card-container">
        <div className="card gray">
          <p>Total Revenue</p>
          <span>₱{revenueData.totalRevenue.toLocaleString()}</span>
          <div className="trend-indicator">
          <div className="trend-badge">
            <FaArrowUp/> 8.9%
          </div><p>in 30 days</p>
        </div>
        </div> 
        <div className="card blue">
          <p>Total HMO Charges (Paid)</p>
          <span>₱{revenueData.hmoCharges.toLocaleString()}</span>
          <div className="trend-badge">
            <FaArrowUp/> 8.9%
          </div>
        </div>
        <div className="card blue">
          <p>Total Discounts Given</p>
          <span>₱{revenueData.discounts.toLocaleString()}</span>
          <div className="trend-badge">
            <FaArrowUp/> 8.9%
          </div>
        </div>
      </div>

       <hr className="line-separator" />

      <div className="summary-and-chart">
        <div className="left-column">
          <div className="summary-table">
            <h4>Summary by Date</h4>
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
                {revenueData.summary.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.date}</td>
                    <td>₱{row.billed.toLocaleString()}</td>
                    <td>₱{row.paid.toLocaleString()}</td>
                    <td>₱{row.discount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="discounts-card">
            <h4>Discounts</h4>
            <div className="discounts-content">
              <div className="discount-box">
                <p>{revenueData.discountBreakdown[0].type}</p>
                <h3>₱{revenueData.discountBreakdown[0].amount.toLocaleString()}</h3>
                <span>Count: {revenueData.discountBreakdown[0].count}</span>
              </div>

              <div className="divider"></div>

              <div className="discount-box">
                <p>{revenueData.discountBreakdown[1].type}</p>
                <h3>₱{revenueData.discountBreakdown[1].amount.toLocaleString()}</h3>
                <span>Count: {revenueData.discountBreakdown[1].count}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="right-column"> 
          <h4>Revenue Income Sources</h4>
          <div className="chart-container">
            <PieChart width={300} height={300}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={120}
                paddingAngle={0}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
            {/* <p style={{ fontWeight: 600, marginTop: '1rem' }}>
              ₱{revenueData.totalRevenue.toLocaleString()}
            </p> */}
          </div>

          <div className="footnote">
          <div className="footnote-icon">
            <FaHeart />
          </div>
          <p>₱{revenueData.discounts.toLocaleString()} in discounts helped 85 patients this month.</p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
