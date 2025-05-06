import React from 'react';
import './SideNavBar.css';
import { FiHome, FiFileText, FiUser, FiCreditCard } from 'react-icons/fi';

const SideNavBar = () => {
  return (
    <div className="side-nav">
      <ul className="nav-list">
        <li className="nav-item active">
          <FiHome className="nav-icon" />
          <span>Dashboard</span>
        </li>
        <li className="nav-item">
          <FiUser className="nav-icon" />
          <span>Patients</span>
        </li>
        <li className="nav-item">
          <FiFileText className="nav-icon" />
          <span>Billing</span>
        </li>
        <li className="nav-item">
          <FiCreditCard className="nav-icon" />
          <span>Invoices</span>
        </li>
      </ul>
    </div>
  );
};

export default SideNavBar;
