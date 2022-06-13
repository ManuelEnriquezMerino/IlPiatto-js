import ListadoDePlatos from "../components/ListadoDePlatos";
import useFetch from "../hooks/useFetch";
import useFetchCategoriaRestriccion from "../hooks/useFetchCategoriaRestriccion";
import SelectFiltrado from '../components/SelectFiltrado';
import { useState } from "react";

function generarArregloOpciones(inicial,opciones){
    return [inicial].concat(
                        opciones.map((opcion) => {return {value: opcion.id, label: opcion.nombre}})
                    ) 
}

const Platos = () => {

    const categoriaDefecto = {value:null, label:"Todas"}
    const restriccionDefecto = {value:null, label:"Ninguna"}

    const {datos:categorias,cargando2,error2} = useFetch("https://il-piatto-api.herokuapp.com/platos/categorias");
    const {datos:restricciones,cargando3,error3} = useFetch("https://il-piatto-api.herokuapp.com/platos/restricciones");

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(categoriaDefecto)
    const [restriccionSeleccionada, setRestriccionSeleccionada] = useState(restriccionDefecto)

    const {datos:platos,cargando,error} = useFetchCategoriaRestriccion(categoriaSeleccionada,restriccionSeleccionada);

    return ( 
        <div className="platos">
            {error && <div className="mensaje"> {error} </div>}
            {cargando && <div className="mensaje">Cargando...</div>}
            <div className="seleccion">
                {categorias && 
                    <SelectFiltrado
                        dato={categoriaSeleccionada}
                        funcionSet={setCategoriaSeleccionada}
                        opciones={generarArregloOpciones(categoriaDefecto,categorias.categorias)} 
                    />
                }
                {restricciones && 
                    <SelectFiltrado
                        dato={restriccionSeleccionada}
                        funcionSet={setRestriccionSeleccionada}
                        opciones={generarArregloOpciones(restriccionDefecto,restricciones.restricciones)}
                    />
                }
            </div>
            {platos && <ListadoDePlatos platos={platos}/>}
        </div>
    );
}
 
export default Platos;