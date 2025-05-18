import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom'; 
import '../components/TopNavBar.css';
import { HiOutlineLogout } from 'react-icons/hi';
import ignatiusLogo from '../assets/ignatiuslogo.svg'; // adjust path as needed

const TopNavBar = () => {
        const [currentTime, setCurrentTime] = useState(new Date());
        const navigate = useNavigate();

        const handleLogout = () => {
          navigate('/'); 
        };

      
        useEffect(() => {
          const timer = setInterval(() => setCurrentTime(new Date()), 60000);
      
          return () => clearInterval(timer);
        }, []);
       
        const date = currentTime.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',   
          day: 'numeric',   
        });
      
        const time = currentTime.toLocaleTimeString('en-US', {
          hour: 'numeric', 
          minute: 'numeric',
          hour12: true,     
        });

  return (
    <div className="top-nav">
      <div className="logo">
        <img src={ignatiusLogo} alt="Ignatius Logo" />
      </div>
      <div className="right-section">
      <div className="date">{date}</div>
      <div className="time">{time}</div>
      <div className="settings-icon" onClick={handleLogout}>
      <HiOutlineLogout style={{ cursor: 'pointer' }} />
      </div>
      </div>
    </div>
  );
};

export default TopNavBar;
