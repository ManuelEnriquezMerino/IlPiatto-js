import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [datos, setDatos] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
            .then(response => {
                return response.json()
            })
            .then((data) => {
                if(data.codigo===200){
                    setError(null)
                    setDatos(data);
                }
                else{
                    setDatos(null);
                    setError(data.error)
                }
                setCargando(false);
            })
            .catch(error => {
                setDatos(null);
                setCargando(false);
                setError(error.message)
            })
    }, [url]);

    return { datos, cargando, error}
}

export default useFetch;