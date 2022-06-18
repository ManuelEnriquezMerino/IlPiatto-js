import Platos from './pages/Platos/Platos';
import AgregarPlato from './pages/Platos/AgregarPlato';
import Usuario from './pages/Usuario';
import Pedidos from './pages/Pedidos/Pedidos';
import Inicio from './pages/Inicio';
import DatosPedido from './pages/Pedidos/DatosPedido';
import NuevoPedido from './pages/Pedidos/NuevoPedido';
import BarraDeNavegacion from './components/BarraDeNavegacion';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <BarraDeNavegacion />
        <div className="contenido">
          <Routes>
            <Route path="/" element={<Inicio/>}/>
            <Route path="/usuario" element={<Usuario/>}/>
            <Route path="/platos" element={<Platos/>}/>
            <Route path="/platos/:id" element={<AgregarPlato/>}/>
            <Route path="/pedidos" element={<Pedidos/>}/>
            <Route path="/pedidos/:id" element={<DatosPedido/>}/>
            <Route path="/pedido/" element={<NuevoPedido/>}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
/*
 <header className="App-header"></header>
<div className="content">
          <Platos/> 
        </div>
*/