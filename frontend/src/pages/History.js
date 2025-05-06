import React, { useEffect } from 'react';
import './history.css';

export default function HistoryPage() {
  useEffect(() => {
    function updateDateTime() {
      const now = new Date();
      const dateString = now.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      });

      const timeString = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });

      const dateTimeElement = document.getElementById('date-time');
      if (dateTimeElement) {
        dateTimeElement.innerHTML = `
          <span class="the-date">${dateString}</span>
          <span class="the-time">${timeString}</span>
        `;
      }
    }

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <header>
        <nav>
          <div className="logo">
            <a href="#"><img src="/logo-combined.png" alt="SIMC Logo" /></a>
          </div>

          <div className="right-side">
            <div className="date-time" id="date-time"></div>
            <div className="avatar">
              <a href="#"><img src="/Avatar.png" alt="Avatar" /></a>
            </div>
          </div>
        </nav>
      </header>

      <div className="layout-wrapper">
        <aside className="sidebar">
          <ul className="nav-links">
            <li className="Billing">
              <a href="#">
                <img src="/history-icon-1.png" alt="Billing Icon" /> Patient Billing
              </a>
            </li>
            <li className="History">
              <a href="#">
                <img src="/history-icon-2.png" alt="History Icon" /> Payment History
              </a>
            </li>
            <li className="Revenue">
              <a href="#">
                <img src="/history-icon-3.png" alt="Reports Icon" /> Revenue Reports
              </a>
            </li>
          </ul>
        </aside>

        <main className="main-content">
          <div className="payment-summary">
            <div className="status paid">
              <p>Paid Payments</p>
              <p className="count-1">(99)</p> <br />
              <h2 className="amount">₱ 246,987.89</h2>
            </div>

            <div className="status partial">
              <p>Partial Payments</p>
              <p className="count-2">(56)</p> <br />
              <h2 className="amount">₱ 135,786.56</h2>
            </div>

            <div className="status overdue">
              <p>Overdue Payments</p>
              <p className="count-3">(8)</p> <br />
              <h2 className="amount">₱ 76,678.12</h2>
            </div>
          </div>

          <h1>Welcome</h1>
        </main>
      </div>
    </>
  );
}