import ListadoDePlatos from "../components/ListadoDePlatos";
import useFetch from "../hooks/useFetch";
import useFetchCategoriaRestriccion from "../hooks/useFetchCategoriaRestriccion";
import Select from 'react-select';
import { useState } from "react";

const Platos = () => {

    const {datos:categorias,cargando2,error2} = useFetch("https://il-piatto-api.herokuapp.com/platos/categorias");
    const {datos:restricciones,cargando3,error3} = useFetch("https://il-piatto-api.herokuapp.com/platos/restricciones");

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState({value:null, label:"Todas"})
    const [restriccionSeleccionada, setRestriccionSeleccionada] = useState({value:null, label:"Ninguna"})

    const {datos:platos,cargando,error} = useFetchCategoriaRestriccion(categoriaSeleccionada,restriccionSeleccionada);

    return ( 
        <div className="platos">
            {error && <div className="mensaje"> {error} </div>}
            {cargando && <div className="mensaje">Cargando...</div>}
            <div className="seleccion">
                {categorias && <Select 
                                    placeholder={"Categorias"}
                                    value={categoriaSeleccionada}
                                    onChange={setCategoriaSeleccionada}
                                    isSearchable={false}
                                    options={[{value:null, label:"Todas"}].concat(categorias.categorias.map((categoria) => {return {value: categoria.id, label: categoria.nombre}}))}
                                />
                }
                {restricciones && <Select
                                    placeholder={"Restricciones"}
                                    value={restriccionSeleccionada}
                                    onChange={setRestriccionSeleccionada}
                                    isSearchable={false}
                                    options={[{value:null, label:"Ninguna"}].concat(restricciones.restricciones.map((restriccion) => {return {value: restriccion.id, label: restriccion.nombre}}))}
                                />
                }
            </div>
            {platos && <ListadoDePlatos platos={platos}/>}
        </div>
    );
}
 
export default Platos;