import { Routes, Route, BrowserRouter} from 'react-router-dom';

//pages
import Patients from './pages/Patients';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Patients />} />
        </Routes>
    </BrowserRouter>

  );
}

export default App;