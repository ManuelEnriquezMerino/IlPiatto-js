import { Link } from 'react-router-dom';
import Login from './Logueo/Login'
import Logout from './Logueo/Logout'

const BarraDeNavegacion = () => {
    return ( 
        <nav className="barranavegacion">
            <img src={require("../assets/logo-blanco.png")} alt="Il Piatto" className="logo"/>
            <div className="links">
                <Link to="/">Inicio</Link>
                <Link to="/platos">Platos</Link>
                <Login/>
                <Logout/>
            </div>
        </nav>
    );
}
 
export default BarraDeNavegacion;