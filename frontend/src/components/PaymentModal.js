import React, { useState } from 'react';
import './PaymentModal.css';
import { FaMoneyBill, FaCreditCard } from 'react-icons/fa';
import { NumericFormat } from 'react-number-format';

const PaymentModal = ({
  isOpen,
  onClose,
  patientName,
  invoiceId,
  balanceDue,
  totalPayments,
}) => {

  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('Cash');

  const handleValueChange = (value) => {
  setAmount(value);
};

const handleSubmitPayment = async () => {
  if (!amount || parseFloat(amount) <= 0) {
  alert('Please enter a valid payment amount.');
  return;
}


try {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/payments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      invoiceId,
      amount: parseFloat(amount),
      method,
      note
    })
  });

    const data = await res.json();

    if (res.ok) {
      alert('Payment successful');
      onClose();
      window.location.reload(); 
    } else {
      alert(data.message || 'Payment failed');
    }
  } catch (err) {
    console.error(err);
    alert('Server error during payment');
  }
};

if (!isOpen) return null;

return (
<div className="modal-backdrop">
<div className="payment-modal">
<div className="modal-header">
<div className="title">
<span className="modal-title">Payment</span>
<span className="invoice-info">{patientName} ({invoiceId})</span>
</div>
<button onClick={onClose}>×</button>
</div>

    <hr className="line-separator" />

    <div className="modal-body">
      <div className="payment-summary">

        <div className="balance-row">
          <span>Balance Due</span>
          <span>₱{balanceDue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>

        <div className="total-payments-row">
          <span>Total Payment</span>
          <span>₱{totalPayments.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>

        <div className="payment-method-section">
          <span className="label">SELECT PAYMENT METHOD</span>
          <div className="method-options">
            <label>
              <span className="label-content">
                <FaMoneyBill className="icon" />
                Cash
              </span>
              <input
                type="radio"
                name="method"
                value="Cash"
                checked={method === 'Cash'}
                onChange={() => setMethod('Cash')}
              />
            </label>

            <label>
              <span className="label-content">
                <FaCreditCard className="icon" />
                Card
              </span>
              <input
                type="radio"
                name="method"
                value="Card"
                checked={method === 'Card'}
                onChange={() => setMethod('Card')}
              />
            </label>
          </div>
        </div>

        <div className="input-group">
          <label>PAYMENT AMOUNT</label>
          <NumericFormat
            value={amount}
            onValueChange={({ value }) => handleValueChange(value)}
            thousandSeparator=","
            prefix="₱"
            decimalScale={2}
            fixedDecimalScale
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="modal-actions">
        <button className="pay-btn" onClick={handleSubmitPayment}>Pay</button>
        <button className="cancel-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  </div>
</div>
);
};

export default PaymentModal;