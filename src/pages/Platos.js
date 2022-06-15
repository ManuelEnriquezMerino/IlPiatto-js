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

function obtenerMensajeError(errorPlatos,errorCategorias,errorRestricciones){
    var error = "";
    if (errorPlatos)
        error+=`Error al obtener los platos: ${errorPlatos}\n`;
    if (errorCategorias)
        error+=`Error al obtener las categorias: ${errorCategorias}\n`;
    if (errorRestricciones)
        error+=`Error al obtener las restricciones: ${errorRestricciones}\n`;
    return error;
}

const Platos = () => {

    const categoriaDefecto = {value:null, label:"Todas"};
    const restriccionDefecto = {value:null, label:"Ninguna"};

    const {datos:categorias,cargando:cargandoCategorias,error:errorCategorias} = useFetch("https://il-piatto-api.herokuapp.com/platos/categorias");
    const {datos:restricciones,cargando:cargandoRestricciones,error:errorRestricciones} = useFetch("https://il-piatto-api.herokuapp.com/platos/restricciones");

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(categoriaDefecto);
    const [restriccionSeleccionada, setRestriccionSeleccionada] = useState(restriccionDefecto);

    const {datos:platos,cargando:cargandoPlatos,error:errorPlatos} = useFetchCategoriaRestriccion(categoriaSeleccionada,restriccionSeleccionada);

    return ( 
        <div className="platos">
            {(errorPlatos || errorCategorias || errorRestricciones) && <div className="mensaje"> {obtenerMensajeError(errorPlatos,errorCategorias,errorRestricciones)} </div>}
            {(cargandoPlatos || cargandoCategorias || cargandoRestricciones) && <div className="mensaje">Cargando...</div>}
            {platos && categorias  && restricciones &&
                <div>
                    <div className="seleccion">
                        <SelectFiltrado
                            dato={categoriaSeleccionada}
                            funcionSet={setCategoriaSeleccionada}
                            opciones={generarArregloOpciones(categoriaDefecto,categorias.categorias)} 
                        />
                        <SelectFiltrado
                            dato={restriccionSeleccionada}
                            funcionSet={setRestriccionSeleccionada}
                            opciones={generarArregloOpciones(restriccionDefecto,restricciones.restricciones)}
                        />
                    </div>
                    <div className="platos">
                        <ListadoDePlatos platos={platos}/>
                    </div>
                </div>
            }
        </div>
    );
}
 
export default Platos;