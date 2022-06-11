import './App.css';
import Platos from './Platos';

const logo = require("./assets/logo-blanco.png");

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} alt="Il Piatto" className="logo"/>
        <div>
          <Platos/> 
        </div>
      </header>
    </div>
  );
}

export default App;
