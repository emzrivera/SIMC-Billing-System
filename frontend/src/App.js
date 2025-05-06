import { Routes, Route, BrowserRouter} from 'react-router-dom';

//pages
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Billing from './pages/Billing.js';
import History from './pages/History.js';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Billing" element={<Billing />} />
          <Route path="/History" element={<History />} />
        
        </Routes>
    </BrowserRouter>

  );
}

export default App;