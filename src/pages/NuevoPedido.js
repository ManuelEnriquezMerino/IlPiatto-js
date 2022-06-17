import { useEffect } from "react";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import useFetchToken from "../hooks/useFetchToken";
import useFetchTokenDatos from "../hooks/useFetchTokenDatos";

const NuevoPedido = () => {

    const [direccion,setDireccion] = useState("");
    
    const {datos:usuario,cargando:cargandoUsuario,error:errorUsuario} = useFetchToken("https://il-piatto-api.herokuapp.com/usuarios")
    const {datos:platos,cargando:cargandoPlatos,error:errorPlatos} = useFetch("https://il-piatto-api.herokuapp.com/platos");
    const {datos:opcionales,cargando:cargandoOpcionales,error:errorOpcionales} = useFetch("https://il-piatto-api.herokuapp.com/platos/opcionales");
    const [inventario, setInventario] = useState(JSON.parse(localStorage.getItem("platos")))

    const url = "https://il-piatto-api.herokuapp.com/pedidos"
    const [mensajePost,setMensajePost] = useState(null);

    const {datos:datosPut,cargando:cargandoPut,error:errorPut} = useFetchTokenDatos(url,mensajePost);

    useEffect(() => {
        if(usuario)
            setDireccion(usuario.usuario.direccion)
    },[usuario])

    useEffect(() => {
        if(inventario)
            localStorage.setItem("platos",JSON.stringify(inventario));
    },[inventario])

    const handleRemove = (event) => {
        const indice = parseInt(event.target.value);
        setInventario(inventario.slice(0, indice).concat(inventario.slice(indice + 1)))
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inventario)
        setMensajePost({method: "POST", objeto: JSON.stringify({direccion:direccion,pedido:inventario})})
        setInventario([]);
    }

    return (
            <div className="nuevo-pedido">
                {platos && opcionales && inventario && 
                    <form onSubmit={handleSubmit}>
                        <div className="direccion">
                            <label>Direccion</label>
                            <input type="text" required value={direccion} onChange={(e) => setDireccion(e.target.value)}/>
                        </div>
                        {inventario.map((orden,index) => (
                                    <div key={index} className="orden">
                                        <h1>{platos.platos.find(plato=>plato.id===orden.plato).nombre}</h1>
                                        {orden.opcionales.map((opcional) => (
                                            <p key={`${index}-${opcional}`}>{opcionales.opcionales.find(opc=>opc.id===opcional).nombre}</p>
                                        ))}
                                        <button value={index} onClick={handleRemove} className="boton-plato-pedido">Quitar</button>
                                    </div>
                        ))}
                        {inventario.length>0 && <button className="boton">Hacer Pedido</button>}
                        {!inventario.length>0 && <button className="boton-deshabilitado" disabled>Sin platos</button>}
                    </form>
                }
            </div>
    );
}
 
export default NuevoPedido;