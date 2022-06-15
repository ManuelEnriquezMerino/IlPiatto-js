const DatosPedidoPlato = ({pedido,platos,opcionales}) => {

    var platosPedido = []

    pedido.platos.forEach(plato => {
        if(!platosPedido[plato.n_orden])
            platosPedido[plato.n_orden]={n_orden:plato.n_orden,plato_id:plato.plato_id,opcionales_id:[plato.opcional_id]};
        else
            platosPedido[plato.n_orden].opcionales_id.push(plato.opcional_id)
    });

    return (  
        <div className="preview-plato-pedido">
            <h2>ID Pedido: {pedido.id}</h2>
            <p>Direccion: {pedido.direccion}</p>
            <p>Fecha y hora: {(new Date(pedido.fecha).toLocaleString())}</p>
            <p>Precio: {pedido.precio}</p>
            {platosPedido.map((orden) => (
                <div className="plato" key={orden.n_orden}>
                    <br/>
                    <h3>Plato: {platos.find(plato=>parseInt(plato.id)===orden.plato_id).nombre}</h3>
                    { orden.opcionales_id[0] &&
                        <div className="opcionales">
                        <h4>Opcionales: </h4>
                        {orden.opcionales_id.map(opcional_id => 
                            <p key={`orden:${orden.n_orden}opcional:${opcional_id}`}>{opcionales.find(opcional=>parseInt(opcional.id)===opcional_id).nombre}</p>
                        )}
                        </div>
                    }
                </div>
            ))}
        </div>
    );
}
 
export default DatosPedidoPlato;