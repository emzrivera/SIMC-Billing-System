import { Routes, Route, BrowserRouter} from 'react-router-dom';

//pages
import Invoices from './pages/Patients';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Invoices />} />
        </Routes>
    </BrowserRouter>

  );
}

export default App;