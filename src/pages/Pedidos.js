import ListadoDePedidos from "../components/ListadoDePedidos";
import useFetchToken from "../hooks/useFetchToken";


const Pedidos = () => {

    const {datos:pedidos,cargando,error} = useFetchToken("https://il-piatto-api.herokuapp.com/pedidos/");

    return ( 
        <div className="pedidos">
            {error && <div className="mensaje"> {error} </div>}
            {cargando && <div className="mensaje">Cargando...</div>}
            {pedidos && <ListadoDePedidos pedidos={pedidos.pedidos}/>}
        </div>
    );
}
 
export default Pedidos;