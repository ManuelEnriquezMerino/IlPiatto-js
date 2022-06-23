import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import useFetchToken from "../../hooks/useFetchToken";
import useFetchTokenDatos from "../../hooks/useFetchTokenDatos";

const NuevoPedido = () => {

    const obtenerMensajeError = () => {
        var error = "";
        if (errorUsuario)
            error+=`Error al obtener los datos del usuario: ${errorUsuario}\n`;
        if (errorPlatos)
            error+=`Error al obtener los platos: ${errorPlatos}\n`;
        if (errorOpcionales)
            error+=`Error al obtener los opcionales: ${errorOpcionales}\n`;
        if (errorPost)
            error+=`Error al crear el nuevo pedido: ${errorPost}\n`;
        return error;
    }

    const inicializarInventario = () => {
        var inventario = JSON.parse(localStorage.getItem("platos"))
        if(!inventario)
            inventario = []
        return inventario
    }

    const [direccion,setDireccion] = useState("");
    
    const {datos:usuario,cargando:cargandoUsuario,error:errorUsuario} = useFetchToken("https://il-piatto-api.herokuapp.com/usuarios")
    const {datos:platos,cargando:cargandoPlatos,error:errorPlatos} = useFetch("https://il-piatto-api.herokuapp.com/platos");
    const {datos:opcionales,cargando:cargandoOpcionales,error:errorOpcionales} = useFetch("https://il-piatto-api.herokuapp.com/platos/opcionales");
    const [inventario, setInventario] = useState(inicializarInventario)
    const url = "https://il-piatto-api.herokuapp.com/pedidos"
    const [mensajePost,setMensajePost] = useState(null);

    const {datos:datosPost,cargando:cargandoPost,error:errorPost} = useFetchTokenDatos(url,mensajePost);

    useEffect(() => {
        if(usuario)
            setDireccion(usuario.usuario.direccion)
    },[usuario])

    useEffect(() => {
        if(inventario)
            localStorage.setItem("platos",JSON.stringify(inventario));
    },[inventario])

    const navigate = useNavigate();
    useEffect(() => {
        if(datosPost)
            navigate(`/pedidos/${datosPost.id}`)
    },[datosPost,navigate])

    const handleRemove = (event) => {
        event.preventDefault();
        const indice = parseInt(event.target.value);
        setInventario(inventario.slice(0, indice).concat(inventario.slice(indice + 1)))
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setMensajePost({method: "POST", objeto: JSON.stringify({direccion:direccion,pedido:inventario})})
        setInventario([]);
    }

    return (
            <div className="nuevo-pedido">
                {(errorUsuario || errorPlatos || errorOpcionales || errorPost) && <div className="mensaje"> {obtenerMensajeError()} </div>}
                {(cargandoUsuario || cargandoPlatos || cargandoOpcionales || cargandoPost) && <div className="mensaje">Cargando...</div>}
                {usuario && platos && opcionales && inventario && (!cargandoPost && !errorPost) &&
                    <form onSubmit={handleSubmit}>
                        <label className="direccion">
                            Direccion
                            <input type="text" required value={direccion} onChange={(e) => setDireccion(e.target.value)}/>
                        </label>
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