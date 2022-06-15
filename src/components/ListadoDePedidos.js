import { Link } from 'react-router-dom';

const ListadoDePedidos = ({pedidos}) => {
    return ( 
        <div className="listado-pedidos">
            {pedidos.map((pedido) => (
                <Link to={`/pedidos/${pedido.id}`} key={pedido.id}>
                    <div className="preview-plato">
                        <h2>ID Pedido: {pedido.id}</h2>
                        <p>Direccion: {pedido.direccion}</p>
                        <p>Fecha y hora: {(new Date(pedido.fecha).toLocaleString())}</p>
                        <p>Precio: {pedido.precio}</p>
                    </div>
                </Link>
            ))}
        </div>
     );
}
 
export default ListadoDePedidos;