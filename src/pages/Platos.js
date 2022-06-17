import ListadoDePlatos from "../components/ListadoDePlatos";
import ListadoDePlatosNuevoPedido from "../components/ListadoDePlatosNuevoPedido";
import useFetch from "../hooks/useFetch";
import useFetchCategoriaRestriccion from "../hooks/useFetchCategoriaRestriccion";
import SelectFiltrado from '../components/SelectFiltrado';
import { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';

function generarArregloOpciones(inicial,opciones){
    return [inicial].concat(
                        opciones.map((opcion) => {return {value: opcion.id, label: opcion.nombre}})
                    ) 
}

const Platos = () => {

    const obtenerMensajeError = () => {
        var error = "";
        if (errorPlatos)
            error+=`Error al obtener los platos: ${errorPlatos}\n`;
        if (errorCategorias)
            error+=`Error al obtener las categorias: ${errorCategorias}\n`;
        if (errorRestricciones)
            error+=`Error al obtener las restricciones: ${errorRestricciones}\n`;
        return error;
    }

    const { isAuthenticated } = useAuth0();

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
                        <div className="select-box">
                            <label className="labelSeleccion">
                                Categoria
                                <SelectFiltrado
                                    dato={categoriaSeleccionada}
                                    funcionSet={setCategoriaSeleccionada}
                                    opciones={generarArregloOpciones(categoriaDefecto,categorias.categorias)} 
                                />
                            </label>
                        </div>
                        <div className="select-box">
                            <label className="labelSeleccion">
                                Restriccion
                                <SelectFiltrado
                                    dato={restriccionSeleccionada}
                                    funcionSet={setRestriccionSeleccionada}
                                    opciones={generarArregloOpciones(restriccionDefecto,restricciones.restricciones)}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="platos">
                        {!isAuthenticated && <ListadoDePlatos platos={platos}/>}
                        {isAuthenticated && <ListadoDePlatosNuevoPedido platos={platos}/>}
                    </div>
                </div>
            }
        </div>
    );
}
 
export default Platos;