import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import './InvoiceDetails.css';
import PaymentModal from '../components/PaymentModal';

import { HiOutlinePencil } from 'react-icons/hi';
import { FaChevronLeft, FaStethoscope, FaPills, FaBed, FaMoneyBill, FaBan } from 'react-icons/fa';

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });

const addDays = (dateStr, days) => {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return formatDate(date);
};

const InvoiceDetails = () => {
  const { id } = useParams(); 
  const [invoice, setInvoice] = useState(null);
  const [hmoInfo, setHmoInfo] = useState([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const openPaymentModal = () => setIsPaymentModalOpen(true);
  const closePaymentModal = () => setIsPaymentModalOpen(false);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/billing-records/${id}`);
        const data = await res.json();
        setInvoice(data);
      } catch (err) {
        console.error('Error fetching invoice:', err);
      }
    };

    fetchInvoice();
  }, [id]);

  useEffect(() => {
  const fetchHmoInfo = async () => {
    if (!invoice?.patientId) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_HMO_API_URL}`);
      const hmoData = await res.json();

      const patientHmo = hmoData.find(entry => entry.patientId === invoice.patientId);

      if (patientHmo?.discount) {
        const afterPatientDiscount = (invoice.totalAmount || 0) - (invoice.discountAmount || 0);
        const hmoDiscount = afterPatientDiscount * (patientHmo.discount / 100);

        setHmoInfo({
          provider: patientHmo.name,
          percentage: patientHmo.discount,
          discount: hmoDiscount
        });
      }
    } catch (err) {
      console.error('Error fetching HMO info:', err);
    }
  };

  fetchHmoInfo();
}, [invoice]);

useEffect(() => {
  const updateInvoiceWithHmo = async () => {
  if (!invoice || !hmoInfo?.provider) return;

  // Log the data being sent to the backend
  console.log({
    hmoInfo,
    totalAmount: invoice.totalAmount,
    discountAmount: invoice.discountAmount,
    amountPaid: invoice.amountPaid
  });

  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/billing-records/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hmoInfo,
        totalAmount: invoice.totalAmount,
        discountAmount: invoice.discountAmount,
        amountPaid: invoice.amountPaid,
        balanceDue
      }),
    });

    if (res.ok) {
      const updatedInvoice = await res.json();
      setInvoice(updatedInvoice); // Update UI with new invoice
    } else {
      console.error('Failed to update invoice with HMO info');
    }
  } catch (err) {
    console.error('Error updating invoice with HMO info:', err);
  }
};


  updateInvoiceWithHmo();
}, [hmoInfo]);



  const SECTION_CONFIG = [
    { key: "medical", label: "Medical Services", icon: <FaStethoscope className="section-icon" /> },
    { key: "room", label: "Room Charge", icon: <FaBed className="section-icon" /> },
    { key: "medicine", label: "Medicine", icon: <FaPills className="section-icon" /> },
  ];

  const chargeData = {
    medical: invoice?.medicalServices?.map(s => ({
      name: s.name,
      unitPrice: s.price,
      quantity: 1
    })) || [],
    room: invoice ? [{
      name: invoice.roomType,
      unitPrice: invoice.roomRate,
      quantity: invoice.noOfDays,
      unit: 'days'
    }] : [],
    medicine: invoice?.medicines?.map(m => ({
      name: m.name,
      unitPrice: m.unitPrice,
      quantity: m.quantity
    })) || []
  };

  const totalAmount = invoice?.totalAmount || 0;
  const discountAmount = invoice?.discountAmount || 0;
  const afterPatientDiscount = totalAmount - discountAmount;
  const hmoDiscount = hmoInfo?.discount || 0;
  const balanceDue = afterPatientDiscount - hmoDiscount - (invoice?.amountPaid || 0);


  const handleVoid = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/billing-records/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Voided' }),
      });

      if (res.ok) {
        const updatedInvoice = await res.json();
        setInvoice(updatedInvoice); // Update UI
      } else {
        console.error('Failed to void invoice');
      }
    } catch (err) {
      console.error('Error voiding invoice:', err);
    }
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
              <h1>{invoice?.invoiceId || 'Loading...'}</h1>
              <span className={`status-${(invoice?.status || '').toLowerCase()}`}>{invoice?.status}</span>
            </div>
            <p className="last-paid">Issued at {formatDate(invoice?.invoiceDate)}</p>
          </div>

          <div className="action-buttons">
            {/* <button className="edit-btn"> < HiOutlinePencil /> Edit</button> */}
            <button className="void-btn" onClick={handleVoid}> < FaBan /> Void</button>
            <button className="add-btn" onClick={openPaymentModal}> < FaMoneyBill /> Add Payment</button>
          </div>
        </div>

        <hr className="line-separator" />

        <div className="invoice-content">
          <div className="invoice-details">
            <div className="invoice-meta">
              <div>
                <div className="meta-item">
                  <span className="label">Patient Name</span>
                  <span className="value"><strong>{invoice?.patientName}</strong></span>
                </div>
                <div className="meta-item">
                  <span className="label">Patient ID</span>
                  <span className="value">{invoice?.patientId}</span>
                </div>
              </div>
              <div>
                <div className="meta-item">
                  <span className="label">Issued</span>
                  <span className="value">{formatDate(invoice?.invoiceDate)}</span>
                </div>
                <div className="meta-item">
                  <span className="label">Due Date</span>
                  <span className="value">{invoice?.invoiceDate ? addDays(invoice.invoiceDate, 5) : '--'}</span>
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
                        <td>₱{item.unitPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                        <td>x{item.quantity} {item.unit || ""}</td>
                        <td>₱{(item.unitPrice * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
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
                <span>₱{totalAmount.toLocaleString()}</span>
              </div>

              {discountAmount > 0 && (
                <div className="summary-row">
                  <span> Discount <span className="badge">{invoice?.patientDiscount || 'None'}</span> </span>
                  <span>– ₱{discountAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              )}

              {hmoInfo && (
                <div className="summary-row">
                  <span>
                    Health Card 
                    <span className="badge">
                      <span className="truncate-tooltip" title={hmoInfo.provider}>
                        {hmoInfo.provider}
                      </span>{' '}
                      {`${hmoInfo.percentage}%`}
                    </span>
                  </span>

                  <span>– ₱{hmoInfo.discount}</span>
                </div>
              )}

              <div className="summary-row">
                <span>Amount Paid</span>
                <span>– ₱{(invoice?.amountPaid || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>

              <div className="summary-row total-remaining">
                <strong>Total Remaining Payable</strong>
                <strong>₱{balanceDue.toLocaleString()}</strong>
              </div>

              <button className="generate-btn">Generate Receipt</button>
            </div>
          </div>
        </div>

        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={closePaymentModal}
          invoiceId={invoice?.invoiceId}
          patientName={invoice?.patientName}
          balanceDue={invoice?.balanceDue}
          totalPayments={invoice?.amountPaid || 0}
          suggestedPayment={invoice?.balanceDue || 0}
        />

      </div>
    </div>
  );
};

export default InvoiceDetails;
