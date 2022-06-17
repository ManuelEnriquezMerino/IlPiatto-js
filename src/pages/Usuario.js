import { useEffect,useState } from "react";
import useFetchToken from "../hooks/useFetchToken";
import useFetchTokenDatos from "../hooks/useFetchTokenDatos";

const Usuario = () => {

    const [nombre,setNombre] = useState("")
    const [apellido,setApellido] = useState("")
    const [nacimiento,setNacimiento] = useState("")
    const [direccion,setDireccion] = useState("")   

    const {datos:usuario,cargando:cargandoUsuario,error:errorUsuario} = useFetchToken("https://il-piatto-api.herokuapp.com/usuarios")

    const [url,setURL] = useState("");
    const [mensajePut,setUsuarioMensajePut] = useState(null);
    const {datos:datosPut,cargando:cargandoPut,error:errorPut} = useFetchTokenDatos(url,mensajePut);


    const handleSubmit = (e) => {
        e.preventDefault();
        setUsuarioMensajePut({method: "PUT", objeto: JSON.stringify({nombre,apellido,nacimiento,direccion})})
    }

    useEffect(() => {
        if(usuario){
            setNombre(usuario.usuario.nombre)
            setApellido(usuario.usuario.apellido)
            setNacimiento(usuario.usuario.nacimiento)
            setDireccion(usuario.usuario.direccion)
            setURL(`https://il-piatto-api.herokuapp.com/usuarios/${usuario.usuario.id}`);
        }
    },[usuario])

    return (

        <div className="usuario">
            {errorUsuario && <div className="mensaje"> {errorUsuario.error} </div>}
            {cargandoUsuario && <div className="mensaje">Cargando...</div>}
            {usuario &&
                <div>
                    <label>Usuario: </label>
                    <label>Email: </label>
                    <form onSubmit={handleSubmit}>
                        <label>Nombre</label>
                        <input type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                        <label>Apellido</label>
                        <input type="text" required value={apellido} onChange={(e) => setApellido(e.target.value)}/>
                        <label>Nacimiento</label>
                        <input type="text" required value={nacimiento} onChange={(e) => setNacimiento(e.target.value)}/>
                        <label>Direccion</label>
                        <input type="text" required value={direccion} onChange={(e) => setDireccion(e.target.value)}/>
                        {!cargandoPut && <button>Guardar</button>}
                        {cargandoPut && <button>Guardando usuario</button>}
                    </form>
                </div>
            }
        </div>
    );
}
 
export default Usuario