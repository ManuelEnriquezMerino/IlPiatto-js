import Platos from './Platos';
import BarraDeNavegacion from './BarraDeNavegacion';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BarraDeNavegacion />
        <div className="content">
          <Platos/> 
        </div>
      </header>
    </div>
  );
}

export default App;
