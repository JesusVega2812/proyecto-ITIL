import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './Componets/Login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;


