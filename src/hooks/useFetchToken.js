import { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';

const useFetchToken = (url) => {
    const { getAccessTokenSilently } = useAuth0();
    const [datos, setDatos] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAccessTokenSilently({
            audience: "https://ilpiatto-api.onrender.com/"
        })
        .then(token =>{
            fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    return response.json()
                })
                .then((data) => {
                    if(data.codigo>=200 && data.codigo<=299){
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
    }, [url,getAccessTokenSilently]);

    return { datos, cargando, error}
}

export default useFetchToken;