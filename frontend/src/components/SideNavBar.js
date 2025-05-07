import React from 'react';
import { NavLink } from 'react-router-dom'; 
import './SideNavBar.css';
import { FiFileText, FiClock, FiTrendingUp  } from 'react-icons/fi';

const SideNavBar = () => {
  return (
    <div className="side-nav">
      <ul className="nav-list">
      
        <li className="nav-item">
            <NavLink to="/billing" className="nav-link">
            <FiFileText className="nav-icon" />
            <span>Patient Billing</span>
          </NavLink>
        </li>  
        <li className="nav-item active">
        <NavLink to="/history" className="nav-link">
            <FiClock className="nav-icon" />
            <span>Payment History</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/reports" className="nav-link">
            <FiTrendingUp className="nav-icon" />
            <span>Revenue Reports</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideNavBar;
