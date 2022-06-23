import { Link } from 'react-router-dom';

const ListadoDePlatosNuevoPedido = ({platos}) => {

    return ( 
        <div className="listado-platos">
            {platos.map((plato) => (
                <Link to={`/platos/${plato.id}`}  key={plato.id} className="link">
                    <div className="preview-plato">
                        <h2>{plato.nombre}</h2>
                        <p>{plato.descripcion}</p>
                        <p>{plato.precio}</p>
                    </div>
                </Link>
            ))}
        </div>
     );
}
 
export default ListadoDePlatosNuevoPedido;