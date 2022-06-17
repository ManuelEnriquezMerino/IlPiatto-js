import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useState } from "react";

const AgregarPlato = (carro) => {

    const {id} = useParams();
    const {datos:plato,cargando:cargandoPlato,error:errorPlato} = useFetch(`https://il-piatto-api.herokuapp.com/platos/${id}`);
    const {datos:opcionales,cargando:cargandoOpcionales,error:errorOpcionales} = useFetch(`https://il-piatto-api.herokuapp.com/platos/opcionales/${id}`);

    const [opcionalesSeleccionados, setOpticonalesSeleccionados] = useState([]);

    const handleCheck = (event) => {
        var updatedList = [...opcionalesSeleccionados];
        if (event.target.checked) {
          updatedList = [...opcionalesSeleccionados, event.target.value];
        } else {
          updatedList.splice(opcionalesSeleccionados.indexOf(event.target.value), 1);
        }
        setOpticonalesSeleccionados(updatedList);
    };

    var estaSeleccionado = (item) =>
      opcionalesSeleccionados.includes(item) ? "checked-item" : "not-checked-item";
  
    const handleSubmit = (e) => {
        e.preventDefault();
        var inventario = JSON.parse(localStorage.getItem("platos"))
        var nuevoPlato={plato:plato.plato[0].id,opcionales:opcionalesSeleccionados}
        if(inventario)
            inventario.push(nuevoPlato)
        else
            inventario = [nuevoPlato]
        localStorage.setItem("platos",JSON.stringify(inventario));
    }

    const obtenerMensajeError = () => {
        var error = "";
        if (errorPlato)
            error+=`Error al obtener el plato: ${errorPlato}\n`;
        if (errorOpcionales)
            error+=`Error al obtener los opcionales: ${errorOpcionales}\n`;
        return error;
    }

    return (
        <div className="agregar-plato">
        {(errorPlato || (errorOpcionales && errorOpcionales!=="El plato ingresado no tiene opcionales")) && <div className="mensaje"> {obtenerMensajeError()} </div>}
        {(cargandoPlato || cargandoOpcionales) && <div className="mensaje">Cargando...</div>}
        {plato &&
            <form onSubmit={handleSubmit}>
                <h1>{plato.plato[0].nombre}</h1>
                <p>{plato.plato[0].descripcion}</p>
                <p>${plato.plato[0].precio}</p>
                <div className="list-container">
                    {opcionales && opcionales.opcionales.map((opcional) => (
                            <div key={opcional.id} className="opcional">
                                <input value={opcional.id} type="checkbox" onChange={handleCheck} />
                                <span className={estaSeleccionado(opcional.id)}>{opcional.nombre}</span>
                                <p>{opcional.descripcion}</p>
                                <p>${opcional.precio}</p>
                            </div>
                    ))}
                </div>
                <button>Agregar</button>
            </form>
        }
        </div>
    );
}
 
export default AgregarPlato;