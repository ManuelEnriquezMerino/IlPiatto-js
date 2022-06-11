const BarraDeNavegacion = () => {
    return ( 
        <nav className="barranavegacion">
            <img src={require("./assets/logo-blanco.png")} alt="Il Piatto" className="logo"/>
            <div className="links">
                <a href="/">Inicio</a>
                <a href="/platos">Platos</a>
                <a href="/">Iniciar Sesión</a>
            </div>
        </nav>
    );
}
 
export default BarraDeNavegacion;