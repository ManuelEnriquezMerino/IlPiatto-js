import Platos from './Platos';
import BarraDeNavegacion from './components/BarraDeNavegacion';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <BarraDeNavegacion />
        <div className="contenido">
          <Routes>
            <Route path="/platos" element={<Platos/>}/>
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