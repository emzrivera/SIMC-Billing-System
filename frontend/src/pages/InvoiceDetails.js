import React from 'react';
import { NavLink } from 'react-router-dom';
import './InvoiceDetails.css';

import {
  HiOutlinePencil,
} from "react-icons/hi";

import { FaChevronLeft, FaStethoscope, FaPills, FaBed, FaMoneyBill, FaBan  } from "react-icons/fa";

const InvoiceDetails = () => {

  const SECTION_CONFIG = [
    {
      key: "medical",
      label: "Medical Services",
      icon: <FaStethoscope className="section-icon" />,
    },
    {
      key: "room",
      label: "Room Charge",
      icon: <FaBed className="section-icon" />,
    },
    {
      key: "medicine",
      label: "Medicine",
      icon: <FaPills className="section-icon" />,
    },
  ];

  const chargeData = {
    medical: [
      { name: "Consultation", unitPrice: 500, quantity: 1 },
      { name: "ECG", unitPrice: 700, quantity: 1 },
      { name: "X-Ray", unitPrice: 700, quantity: 1 },
    ],
    room: [
      { name: "Private Room", unitPrice: 650, quantity: 2, unit: "days" },
    ],
    medicine: [
      { name: "Paracetamol", unitPrice: 10, quantity: 10 },
    ],
  };


  return (
    <div className="invoice-details-page">
      <div className="invoice-details-container">
        
          <div className="breadcrumb-container">
            <NavLink to="/billing" className="back-btn">
              <FaChevronLeft />
            </NavLink>
            <div className="breadcrumb">
              <span className="link">Invoice List</span> / <span>Invoice Details</span>
            </div>
          </div>

          <div className="header-row">
            <div>
            <div className="header-right">
              <h1>INV–00987</h1>
              <span className="status paid">Paid</span>
            </div>
            <p className="last-paid">Last Paid at 18 Apr 2025</p>
            </div>

            <div className="action-buttons">
              <button className="edit-btn"> < HiOutlinePencil /> Edit</button>
              <button className="void-btn"> < FaBan /> Void</button>
              <button className="add-btn"> < FaMoneyBill /> Add Payment</button>
            </div>
          </div>

          <hr className="line-separator" />

          <div className="invoice-content">
              <div className="invoice-details">
              <div className="invoice-meta">
                <div>
                  <div className="meta-item">
                    <span className="label">Patient Name</span>
                    <span className="value"><strong>Anita Reyes</strong></span>
                  </div>
                  <div className="meta-item">
                    <span className="label">Patient ID</span>
                    <span className="value">IPT-2038</span>
                  </div>
                </div>
                <div>
                  <div className="meta-item">
                    <span className="label">Issued</span>
                    <span className="value">18 Apr 2025</span>
                  </div>
                  <div className="meta-item">
                    <span className="label">Due Date</span>
                    <span className="value">22 Apr 2025</span>
                  </div>
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
                  {SECTION_CONFIG.map(({ key, label, icon }) => (
                    <React.Fragment key={key}>
                      <tr className="section">
                        <td colSpan="4">
                          <strong className="flex items-center gap-2">
                            {icon} {label}
                          </strong>
                        </td>
                      </tr>
                      {(chargeData[key] || []).map((item, index) => (
                        <tr key={index} className="charge-row">
                          <td>{item.name}</td>
                          <td>₱{item.unitPrice.toFixed(2)}</td>
                          <td>
                            x{item.quantity} {item.unit || ""}
                          </td>
                          <td>
                            ₱{(item.unitPrice * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>

              </div>

              <div className="summary-actions">

                <div className="notes">
                  <h4 className="notes-title">Notes</h4>
                  <p>Finalized. No additional charges.</p>
                </div>

                <div className="summary-box">
                  
                   <h4 className="payment-title">Payment Summary</h4>
              
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
                    <span>– ₱2,480.00</span>
                  </div>

                  <div className="summary-row total-remaining">
                    <strong>Total Remaining Payable</strong>
                    <strong>₱ 0.00</strong>
                  </div>

                  <button className="generate-btn">Generate Receipt</button>
                </div>
              </div>
            </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
