import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

// Importing pages
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Billing from './pages/Billing.js';
import History from './pages/History.js';
import InvoiceDetails from './pages/InvoiceDetails.js';

// Importing components
import SideNavBar from './components/SideNavBar';
import TopNavBar from './components/TopNavBar';


const App = () => {
  return (
    <BrowserRouter>
      {/* Wrapping everything inside BrowserRouter */}
      <TopNavBar /> {/* This will stay on top */}
      
      <div style={{ display: 'flex' }}>
        {/* Fixed sidebar */}
        <SideNavBar /> 

        <div style={{ marginLeft: '300px', padding: '20px', flex: 1 }}>
          {/* Main content container */}
          <Routes>
            {/* Define routes to the pages */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/invoice" element={<InvoiceDetails />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;