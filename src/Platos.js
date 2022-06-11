import { useEffect, useState } from "react";
import ListadoDePlatos from "./ListadoDePlatos";

const Platos = () => {
    const [platos, setPlatos] = useState(null)

    useEffect(() => {
        fetch("http://il-piatto-api.herokuapp.com/platos")
            .then(response => {
                return response.json()
            })
            .then((data) => {
                setPlatos(data);
            })
    }, [])

    return ( 
        <div className="platos">
            {platos && <ListadoDePlatos platos={platos.plato}/>}
        </div>
    );
}
 
export default Platos;