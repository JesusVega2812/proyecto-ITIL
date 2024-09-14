import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Login } from './Componets/Login/Login';
import { Header } from './Componets/Header/Header.jsx';
import { Header_sin_editar } from './Componets/Header/Header_sin_editar.jsx';
import { Footer } from './Componets/Footer/Footer.jsx';
import {Editar_jefe_departamento} from './Componets/Editar/Editar_jefe_departamento.jsx';
import {Editar_Administrador} from './Componets/Editar/Editar_Administrador.jsx';
import { Principal_administrador } from './Componets/Principal/Principal_administrador.jsx';
import { Principal_otro } from './Componets/Principal/Principal_otro.jsx';

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

  const permisos = localStorage.getItem('permisos');

  const renderComponent = () => {
      if (location.pathname === '/Principal') {
          if (permisos === '1') {
              return <Principal_administrador />;
          } else if (permisos === '2' || permisos === '3') {
              return <Principal_otro />;
          }
      }
      return null;
  };

  const renderHeader = () => {
    if (location.pathname === '/Principal') {
      if (permisos === '1' || permisos === '2') {
          return <Header />;
      } else if (permisos === '3') {
          return <Header_sin_editar />;
      }
    }
    return null;
  };

  return (
      <>
          {!hideHeaderFooter && renderHeader()}
          <Routes>
              <Route path="/" element={<Navigate to="/Login" />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Principal" element={renderComponent()} />
              <Route path="/Editar_Administrador" element={<Editar_Administrador />} />
              <Route path="/Editar_jefe_departamento" element={<Editar_jefe_departamento />} />
          </Routes>
          {!hideHeaderFooter && <Footer />}
      </>
  );
}

export default App;