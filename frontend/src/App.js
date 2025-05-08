import React from 'react';
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';

// Importing pages
import MockInputPage from './pages/MockInputPage';
import Login from './pages/Login.js';
import Billing from './pages/Billing.js';
import History from './pages/History.js';
import InvoiceDetails from './pages/InvoiceDetails.js';
import Meds from './pages/fetchmedicine.js';

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
            <Route path="/login" element={<Login />} />
            <Route path="/mock" element={<MockInputPage />} />
            <Route path="/meds" element={<Meds />} />
            <Route path="/billing" element={<ProtectedRoute> <Billing /> </ProtectedRoute>} />
            <Route path="/invoice" element={<ProtectedRoute> <InvoiceDetails /> </ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute> <History /> </ProtectedRoute>} />
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