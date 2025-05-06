import React from 'react';
import '../pages/TopNavBar.css';

const TopNavBar = () => {
  return (
    <header className="header">
      <div className="logo">
      <a href="#"><img src="../assets/ignatiuslogo.svg" alt="SIMC Logo" /></a>
        </div>
      <div className="header-right">
        <span className="date-time">Sun, Apr 20 &nbsp; 10:45 AM</span>
        <div className="avatar"></div>
      </div>
    </header>
  );
};

export default TopNavBar;
