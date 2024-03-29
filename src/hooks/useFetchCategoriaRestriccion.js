import { useEffect, useState } from "react";

const useFetchCategoriaRestriccion = (categoria,restriccion) => {
    const [datos, setDatos] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
 
    useEffect(() => {
        var urlCategoria = "https://ilpiatto-api.onrender.com/platos";
        if(categoria.value!=null)
            urlCategoria+=`/categorias/${categoria.value}`;

        var urlRestriccion = "https://ilpiatto-api.onrender.com/platos"
        if(restriccion.value!=null)
            urlRestriccion+=`/restricciones/${restriccion.value}`

        try {
            Promise.all([
              fetch(urlCategoria).then(respuesta => respuesta.json()),
              fetch(urlRestriccion).then(respuesta => respuesta.json())
            ])
            .then((datos) => {
                if(datos[0].codigo===200 && datos[1].codigo===200){
                    setError(null);
                    setDatos(datos[0].platos.filter(plato1 => datos[1].platos.some(plato2 => plato1.id === plato2.id)));
                }
                else{
                    setDatos(null);
                    var error =""
                    if(datos[0].codigo!==200)
                        error+=datos[0].error+"\n";
                    if (datos[1].codigo!==200)
                        error+=datos[1].error+"\n";
                    setError(error);
                }
                setCargando(false);
            })
            .catch(error => {
                setDatos(null);
                setCargando(false);
                setError(error.message);
            })
        } catch(error) {
            setDatos(null);
            setCargando(false);
            setError(error.message); 
        }

    }, [categoria,restriccion]);
    
    return { datos, cargando, error}
}

export default useFetchCategoriaRestriccion;