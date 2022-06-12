import { Link } from 'react-router-dom';

const BarraDeNavegacion = () => {
    return ( 
        <nav className="barranavegacion">
            <img src={require("../assets/logo-blanco.png")} alt="Il Piatto" className="logo"/>
            <div className="links">
                <Link to="/">Inicio</Link>
                <Link to="/platos">Platos</Link>
                <Link to="/">Iniciar Sesión</Link>
            </div>
        </nav>
    );
}
 
export default BarraDeNavegacion;