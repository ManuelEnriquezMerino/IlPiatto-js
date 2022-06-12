const ListadoDePlatos = ({platos}) => {
    return ( 
        <div className="listado-platos">
            {platos.map((plato) => (
                <div className="preview-plato" key={plato.id}>
                    <h2>{plato.nombre}</h2>
                    <p>{plato.descripcion}</p>
                    <p>{plato.precio}</p>
                </div>
            ))}
        </div>
     );
}
 
export default ListadoDePlatos;