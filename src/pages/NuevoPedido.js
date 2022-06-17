import { useEffect } from "react";
import { useState } from "react";
import useFetch from "../hooks/useFetch";

const NuevoPedido = () => {

    const {datos:platos,cargando:cargandoPlatos,error:errorPlatos} = useFetch("https://il-piatto-api.herokuapp.com/platos");
    const {datos:opcionales,cargando:cargandoOpcionales,error:errorOpcionales} = useFetch("https://il-piatto-api.herokuapp.com/platos/opcionales");
    const [inventario, setInventario] = useState(JSON.parse(localStorage.getItem("platos")))

    useEffect(() => {
        if(inventario)
            localStorage.setItem("platos",JSON.stringify(inventario));
    },[inventario])

    const handleRemove = (event) => {
        const indice = parseInt(event.target.value);
        setInventario(inventario.slice(0, indice).concat(inventario.slice(indice + 1)))
    };

    return (
        <div>
            {platos && opcionales && inventario && 
            inventario.map((orden,index) => (
                        <div key={index} className="orden">
                            <h1>{platos.platos.find(plato=>plato.id===orden.plato).nombre}</h1>
                            {orden.opcionales.map((opcional) => (
                                <p key={`${index}-${opcional}`}>{opcionales.opcionales.find(opc=>opc.id===opcional).nombre}</p>
                            ))}
                            <button value={index} onClick={handleRemove}>Quitar</button>
                        </div>
                    ))}
        </div>
    );
}
 
export default NuevoPedido;