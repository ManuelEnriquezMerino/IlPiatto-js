import { Link } from 'react-router-dom';
import Login from './Logueo/Login'
import Logout from './Logueo/Logout'
import { useAuth0 } from '@auth0/auth0-react';

const BarraDeNavegacion = () => {
    const { isAuthenticated } = useAuth0();

    return ( 
        <nav className="barranavegacion">
            <img src={require("../assets/logo-blanco.png")} alt="Il Piatto" className="logo"/>
            <div className="links">
                <Link to="/">Inicio</Link>
                <Link to="/platos">Platos</Link>
                {isAuthenticated && <Link to="/pedidos">Pedidos</Link>}  
                {!isAuthenticated && <Login/>}
                {isAuthenticated && <Logout/>}     
            </div>
        </nav>
    );
}
 
export default BarraDeNavegacion;