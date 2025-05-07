import React from 'react';
import './InvoiceDetails.css';

const InvoiceDetails = () => {
  return (
    <div className="invoice-details-page">
      <div className="invoice-details-container">
        <div className="breadcrumb">
          <span className="link">Invoice List</span> / <span>Invoice Details</span>
        </div>

        <div className="header-row">
          <h2>INV–00987</h2>
          <span className="status paid">Paid</span>
        </div>
        <p className="last-paid">Last Paid at <strong>18 Apr 2025</strong></p>

        <div className="invoice-meta">
          <div>
            <p><strong>Patient Name:</strong> Anita Reyes</p>
            <p><strong>Patient ID:</strong> IPT-2038</p>
          </div>
          <div>
            <p><strong>Issued:</strong> 18 Apr 2025</p>
            <p><strong>Due Date:</strong> 22 Apr 2025</p>
          </div>
        </div>

        <table className="charges-table">
          <thead>
            <tr>
              <th>Bill Charges</th>
              <th>Unit Price</th>
              <th></th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="section">
              <td colSpan="4"><strong> Medical Services</strong></td>
            </tr>
            <tr>
              <td>Consultation</td>
              <td>₱500.00</td>
              <td>x1</td>
              <td>₱500.00</td>
            </tr>
            <tr>
              <td>ECG</td>
              <td>₱700.00</td>
              <td>x1</td>
              <td>₱700.00</td>
            </tr>
            <tr>
              <td>X-Ray</td>
              <td>₱700.00</td>
              <td>x1</td>
              <td>₱700.00</td>
            </tr>

            <tr className="section">
              <td colSpan="4"><strong> Room Charge</strong></td>
            </tr>
            <tr>
              <td>Private Room</td>
              <td>₱650.00</td>
              <td>x2 days</td>
              <td>₱1,300.00</td>
            </tr>

            <tr className="section">
              <td colSpan="4"><strong> Medicine</strong></td>
            </tr>
            <tr>
              <td>Paracetamol</td>
              <td>₱10.00</td>
              <td>x10</td>
              <td>₱100.00</td>
            </tr>
          </tbody>
        </table>

        <div className="summary-actions">
          <div className="notes">
            <h4>Notes</h4>
            <p>Finalized. No additional charges.</p>
          </div>

          <div className="summary-box">
            <h4>Payment Summary</h4>
            <div className="summary-row">
              <span>Total</span>
              <span>₱3,100.00</span>
            </div>
            <div className="summary-row">
              <span>Discount <span className="badge">Senior Citizen</span></span>
              <span>– ₱620.00</span>
            </div>
            <div className="summary-row">
              <span>Amount Paid <span className="badge blue">PhilHealth</span></span>
              <span>₱2,480.00</span>
            </div>
            <div className="summary-row total-remaining">
              <strong>Total Remaining Payable</strong>
              <strong>₱ 0.00</strong>
            </div>
            <button className="generate-btn">Generate Receipt</button>
          </div>
        </div>

        <div className="action-buttons">
          <button className="edit-btn">✏ Edit</button>
          <button className="void-btn">Void</button>
          <button className="add-btn">Add Payment</button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
