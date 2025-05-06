import { Routes, Route, BrowserRouter} from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
//pages
import Home from './pages/Home';
import Login from './pages/Login';
import Billing from './pages/Billing';
import History from './pages/History';
import MockInputPage from './pages/MockInputPage';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/mock" element={<MockInputPage />} />
          <Route path="/Home" element={<ProtectedRoute> <Home /> </ProtectedRoute>}/>
          <Route path="/Billing" element={<ProtectedRoute> <Billing /> </ProtectedRoute>} />
          <Route path="/History" element={<ProtectedRoute> <History /> </ProtectedRoute>} />
        </Routes>
    </BrowserRouter>

  );
}

export default App;