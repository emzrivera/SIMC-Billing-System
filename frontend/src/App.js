import { Routes, Route, BrowserRouter} from 'react-router-dom';

//pages
import Home from './pages/Home';
import Login from './pages/Login';

import Billing from './pages/Billing';
import History from './pages/History';

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