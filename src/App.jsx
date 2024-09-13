import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './Componets/Login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="/Login" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;


