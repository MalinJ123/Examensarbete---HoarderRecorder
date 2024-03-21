import "../styles/showObject.css";

import { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../ContextRoot";
import { useState } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";


export const ShowObject = () => {   
  
  const { objectId } = useParams(); // Hämta objektets ID från URL:en
  const [objectData, setObjectData] = useState(null);
// Tillbaka knapp i headern 
    const { setChangeButtonsOnView } = useContext(AppContext);
    useEffect(() => {
      setChangeButtonsOnView("show-object");
      
      const fetchObjectData = async () => {
        try {
          const docRef = doc(db, "objects", objectId); // Skapa referens till objektet med objektets ID
          const docSnap = await getDoc(docRef); // Hämta dokumentet från databasen
          if (docSnap.exists()) {
            setObjectData(docSnap.data()); // Sätt objektets data i state
          } else {
            console.log("Objektet finns inte.");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
  
      fetchObjectData(); // Kör funktionen för att hämta objektets data
    }, [objectId, setChangeButtonsOnView]);
  
    // Om objektData är null, visa en laddningsindikator eller ett meddelande
    if (!objectData) {
      return <p>Laddar...</p>;
    }

  const { name, producer, value, note, images } = objectData;
  const currentImage = images[currentImageIndex]; 

 
    // För att navigera till redigeringssidan med objektets ID
  const editLink = `/edit-object/${objectId}`;


  // Funktion för att hantera objektradering
  const handleDelete = () => {
    // Implementera logik för att radera objektet
  };



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
  
    return (
      <>
        <section className="show-object-wrapper section--spacer">
          <div className="object-title-p">
            <p className="standard__text title">{name}</p>
            <p className="standard__text">Författare: {producer}</p>
            <p className="standard__text">Pris: {value}</p>
          </div>
  
          <div className="object-all-images">
          <span className="material-symbols-outlined back-arrow" onClick={handleBackClick}>
            arrow_back_ios
          </span>
            {images.map((image, index) => (
              <img key={index} className="small-img" src={currentImage} alt="Bild på ditt objekt" />
            ))}
             <span className="material-symbols-outlined forward-arrow" onClick={handleForwardClick}>
            arrow_forward_ios
          </span>
          </div>
  
          <div className="description-content section--spacer">
            <p className="standard__text-title">Anteckning</p>
            <p className="standard__text">{note}</p>
          </div>
  
          <button className="fixed__button" type="button" title="Redigera">
            <Link to={editLink}>
              <span className="material-symbols-outlined">edit</span>
            </Link>
          </button>
  
          <button className="fixed__button fixed__button--second" type="button" onClick={handleDelete}>
            <span className="material-symbols-outlined trash__btn">delete</span>
          </button>
        </section>
      </>
    );
  };