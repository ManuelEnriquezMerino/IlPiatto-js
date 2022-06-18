import { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';

const useFetchTokenDatos = (url,mensaje) => {
    const { getAccessTokenSilently } = useAuth0();
    const [datos, setDatos] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        
        if(url && mensaje){
            setCargando(true);
            getAccessTokenSilently({
                audience: 'https://il-piatto-api.herokuapp.com/'
            })
            .then(token =>{
                fetch(url, {
                    method: mensaje.method,
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: mensaje.objeto
                })
                    .then(response => {
                        var data = null
                        if(response.status!==204)
                            data = response.json()
                        return data
                    })
                    .then((data) => {
                        if(!data || (data.codigo>=200 && data.codigo<=299)){
                            setError(null);
                            setDatos(data);
                        }
                        else{
                            setDatos(null);
                            setError(data.error);
                        }
                        setCargando(false);
                    })
                    .catch(error => {
                        setDatos(null);
                        setCargando(false);
                        setError(error.message)
                    })
            }).catch(error => {
                setDatos(null);
                setCargando(false);
                setError(error.message)
            })
        }    
    }, [url,mensaje,getAccessTokenSilently]);

    return { datos, cargando, error}
}

export default useFetchTokenDatos;