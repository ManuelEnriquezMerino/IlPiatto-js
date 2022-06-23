import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const fadeImages = [
  {
    url: require("../assets/restaurant-1.jpg")
  },
  {
    url: require("../assets/restaurant-2.jpg")
  },
  {
    url: require("../assets/restaurant-3.jpg")
  },
  {
    url: require("../assets/restaurant-4.jpg")
  }
];

const Galeria = () => {
    return (
      <div className="slide-container">
        <Fade {...{duration:3000,arrows:false}}>
          {fadeImages.map((fadeImage, index) => (
            <div className="each-fade" key={index}>
              <div className="image-container">
                <img src={fadeImage.url} alt="Imagenes de Il'Piatto"/>
              </div>
            </div>
          ))}
        </Fade>
      </div>
    )
  }
 
export default Galeria;