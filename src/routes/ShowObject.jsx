import "../styles/showObject.css";

import { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../ContextRoot";
import { useState } from "react";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";


export const ShowObject = () => {   
  
  const { objectId } = useParams(); // Hämta objektets ID från URL:en
  const [objectData, setObjectData] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

// Tillbaka knapp i headern 
    const { setChangeButtonsOnView } = useContext(AppContext);
    useEffect(() => {
      setChangeButtonsOnView("show-object");
      
      const fetchObjectData = async () => {
        try {
          const objectRef = collection(db, "objects");
          const matchObject = query(objectRef, where("id", "==", objectId));
          const querySnapshot = await getDocs(matchObject);

          querySnapshot.forEach((doc) => {
            setObjectData({ id: doc.id, ...doc.data() });
          });
        } catch (error) {
          console.error("Error fetching object:", error);
          // Handle error (e.g., display an error message)
        };
      };
  
      fetchObjectData(); // Kör funktionen för att hämta objektets data
    }, [objectId, setChangeButtonsOnView]);
  
    // Om objektData är null, visa en laddningsindikator eller ett meddelande
    if (!objectData) {
      return <p>Laddar...</p>;
    }

  const { name, producer, value, note, images } = objectData;

    // För att navigera till redigeringssidan med objektets ID
  const editLink = `/edit-object/${objectId}`;


  // Funktion för att hantera objektradering
  const handleDelete = () => {
    // Implementera logik för att radera objektet
  };

  const handleBackClick = () => {
    // Handle empty images array or missing currentImage
    if (!objectData.images || !currentImage) {
      return; // Or handle the situation (e.g., display a placeholder image)
    }
  
    // Get the index of the current image
    const currentIndex = objectData.images.indexOf(currentImage);
  
    // Calculate the previous image index (handling edge case)
    const previousIndex = (currentIndex - 1 + objectData.images.length) % objectData.images.length;
  
    // Update currentImage using the previous index
    setCurrentImage(objectData.images[previousIndex]);
  };
  
  const handleForwardClick = () => {
    // Handle empty images array or missing currentImage
    if (!objectData.images || !currentImage) {
      return; // Or handle the situation (e.g., display a placeholder image)
    }
  
    // Similar logic to handleForwardClick (see explanation above)
    const nextIndex = (objectData.images.indexOf(currentImage) + 1) % objectData.images.length;
    setCurrentImage(objectData.images[nextIndex]);
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
          <img className="big-img" src={currentImage} alt="Objekt bild" />
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