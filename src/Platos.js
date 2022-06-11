import { useEffect, useState } from "react";
import ListadoDePlatos from "./ListadoDePlatos";

const Platos = () => {
    const [platos, setPlatos] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://il-piatto-api.herokuapp.com/platos")
            .then(response => {
                return response.json()
            })
            .then((data) => {
                if(data.codigo===200){
                    setError(null)
                    setPlatos(data);
                }
                else{
                    setPlatos(null);
                    setError(data.error)
                }
                setCargando(false);
            })
            .catch(error => {
                setCargando(false);
                setError(error.message)
            })
    }, [])

    return ( 
        <div className="platos">
            {error && <div className="mensaje"> {error} </div>}
            {cargando && <div className="mensaje">Cargando...</div>}
            {platos && <ListadoDePlatos platos={platos.plato}/>}
        </div>
    );
}
 
export default Platos;