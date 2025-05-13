import React from 'react';
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';

// Importing pages
import Login from './pages/Login.js';
import Billing from './pages/Billing.js';
import History from './pages/History.js';
import PatientHistory from './pages/PatientHistory.js'; // added
import InvoiceDetails from './pages/InvoiceDetails.js';
import Revenue from './pages/Revenue.js';
import Mockpage from './pages/mockimputform.js';
// Importing components
import SideNavBar from './components/SideNavBar';
import TopNavBar from './components/TopNavBar';

const AppLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
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
            <Route path="/" element={<Login />} />
            <Route path="/mock" element={<Mockpage />} />
            <Route path="/billing" element={<ProtectedRoute> <Billing /> </ProtectedRoute>} />
            <Route path="/invoice/:id" element={<ProtectedRoute> <InvoiceDetails /> </ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute> <History /> </ProtectedRoute>} />
            <Route path="/revenue" element={<ProtectedRoute> <Revenue /> </ProtectedRoute>} />
            <Route path="/history/patient-history" element={<ProtectedRoute> <PatientHistory /> </ProtectedRoute>} />
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
