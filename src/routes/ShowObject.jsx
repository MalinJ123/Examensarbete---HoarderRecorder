import "../styles/showObject.css";
import heir from "../images/eld.png";
import blade from "../images/blade.png";
import storm from "../images/storm.png";
import { useContext, useEffect } from "react";
import { AppContext } from "../ContextRoot";
import { useState } from "react";
export const ShowObject = () => {
    const [currentImage, setCurrentImage] = useState(heir); // Startbild är 'heir'
  
    const images = [storm, blade, heir]; // Array med alla bilder i ordning
  
    const handleBackClick = () => {
      const currentIndex = images.indexOf(currentImage);
      const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      setCurrentImage(images[newIndex]);
    };
  
    const handleForwardClick = () => {
      const currentIndex = images.indexOf(currentImage);
      const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      setCurrentImage(images[newIndex]);
    };
  
    // Tillbaka knapp i headern 
    const { setChangeButtonsOnView } = useContext(AppContext);

    useEffect(() => {
        setChangeButtonsOnView("show-object");
      });

    return (
      <>
        <section className="show-object-wrapper">
          <div className="object-title-p">
            <p className="standard__text title">Heir of Fire</p>
            <p className="standard__text ">Författare: Sara J Maas</p>
            <p className="standard__text ">Pris: 200 kr </p>
          </div>
  
          <div className="object-all-images">
            <span className="material-symbols-outlined back-arrow" onClick={handleBackClick}>
              arrow_back_ios
            </span>
            <img className="big-img" src={currentImage} alt="Bild på ditt objekt" />
            <span className="material-symbols-outlined forward-arrow" onClick={handleForwardClick}>
              arrow_forward_ios
            </span>
  
            <div className="small-images">
              <img className="small-img" src={storm} alt="Bild på ditt objekt" />
              <img className="small-img" src={blade} alt="Bild på ditt objekt" />
              <img className="small-img" src={heir} alt="Bild på ditt objekt" />
            </div>
          </div>
  
          <div className="description-content">
            <p className="standard__text-title">Anteckning</p>
            <p className="standard__text">
              Detta är en skitbra bok. Om jag hittar en liknande bok så borde jag köpa den eftersom den här är trasig i
              bokryggen.
            </p>
          </div>
          <button className="fixed__button" type="button" title="Slutför">
  <span className="material-symbols-outlined round__button-icon">
    done
  </span>
</button>

<button className="fixed__button fixed__button--second" type="button">
  <span className="material-symbols-outlined trash__btn">delete</span>
</button>
          
        </section>
      </>
    );
  };