import Platos from './pages/Platos';
import Pedidos from './pages/Pedidos';
import Inicio from './pages/Inicio';
import DatosPedido from './pages/DatosPedido';
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
            <Route path="/platos" element={<Platos/>}/>
            <Route path="/pedidos" element={<Pedidos/>}/>
            <Route path="/pedidos/:id" element={<DatosPedido/>}/>
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