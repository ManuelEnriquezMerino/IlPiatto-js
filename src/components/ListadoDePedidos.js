const ListadoDePedidos = ({pedidos}) => {
    return ( 
        <div className="listado-pedidos">
            {pedidos.map((pedido) => (
                <div className="preview-plato" key={pedido.id}>
                    <h2>{pedido.fecha}</h2>
                    <p>{pedido.direccion}</p>
                    <p>{pedido.precio}</p>
                </div>
            ))}
        </div>
     );
}
 
export default ListadoDePedidos;