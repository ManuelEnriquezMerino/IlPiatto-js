import DatosPedidoPlato from '../../components/DatosPedidoPlato';
import { useParams } from "react-router-dom";
import useFetchToken from "../../hooks/useFetchToken";
import useFetch from "../../hooks/useFetch";

const DatosPedido = () => {

    const obtenerMensajeError = () => {
        var error = "";
        if (errorPedido)
            error+=`Error al obtener los datos del pedido: ${errorPedido}\n`;
        if (errorPlatos)
            error+=`Error al obtener los platos: ${errorPlatos}\n`;
        if (errorOpcionales)
            error+=`Error al obtener los opcionales: ${errorOpcionales}\n`;
        return error;
    }
    

    const {id} = useParams();
    const {datos:pedido,cargando:cargandoPedido,error:errorPedido} = useFetchToken(`https://ilpiatto-api.onrender.com/pedidos/${id}`);
    const {datos:platos,cargando:cargandoPlatos,error:errorPlatos} = useFetch("https://ilpiatto-api.onrender.com/platos");
    const {datos:opcionales,cargando:cargandoOpcionales,error:errorOpcionales} = useFetch("https://ilpiatto-api.onrender.com/platos/opcionales");

    return (
        <div className="mostrarPedido">
            {(errorPedido || errorPlatos || errorOpcionales) && <div className="mensaje"> {obtenerMensajeError(errorPlatos,errorOpcionales)} </div>}
            {(cargandoPedido || cargandoPlatos || cargandoOpcionales) && <div className="mensaje">Cargando...</div>}
            {pedido && platos && opcionales &&
                <DatosPedidoPlato id={id} pedido={pedido} platos={platos.platos} opcionales={opcionales.opcionales}/>
            }
        </div>
    );
}
 
export default DatosPedido;