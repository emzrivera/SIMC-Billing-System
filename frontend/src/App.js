import React from 'react';
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';

// Importing pages
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Billing from './pages/Billing.js';
import History from './pages/History.js';
import InvoiceDetails from './pages/InvoiceDetails.js';

// Importing components
import SideNavBar from './components/SideNavBar';
import TopNavBar from './components/TopNavBar';


const AppLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  // Main layout for the rest of the app
  return (
    <>
      <TopNavBar />
      <div style={{ display: 'flex' }}>
        <SideNavBar />
        <div style={{ marginLeft: '300px', padding: '20px', flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/invoice" element={<InvoiceDetails />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};

export default App;