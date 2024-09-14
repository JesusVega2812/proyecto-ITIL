import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Login } from './Componets/Login/Login';
import { Header } from './Componets/Header/Header.jsx';
import { Footer } from './Componets/Footer/Footer.jsx';
// Importa el CSS de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';


export function App() {
  return (
      <Router>
        <Content/>
      </Router>
  );
}

function Content() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/Login';

  return (
      <>
        {!hideHeaderFooter && <Header/>}
        <Routes>
          <Route path="/" element={<Navigate to="/Login" />} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Principal" element={<Login/>} />
        </Routes>
        {!hideHeaderFooter && <Footer/>}
      </>
  );
}

export default App;