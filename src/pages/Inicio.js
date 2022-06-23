import Galeria from '../components/Galeria';

const Inicio = () => {
    return ( 
        <div className="inicio">
            <h3>Desde nuestra apertura en 1996, ofrecemos una comida auténtica basada en la cocina italiana tradicional. La calidad de nuestros productos se respalda por el uso de horno de leña para la elaboración de las pizzas y el pan. Pero si en algo nos caracterizamos es por nuestra preocupación por las personas con algún tipo de intolerancia alimenticia. Destacan los menús especiales aptos para celíacos, intolerantes a la lactosa o gente que esté realizando algún tipo de dieta.
            Una mesa repleta de productos tradicionales que podrás acompañar gracias a una extensa carta de vinos que incluye ejemplares de origen italiano y español.
            </h3>
            <br/>
            <Galeria/>
        </div>   
    );
}

export default Inicio;
