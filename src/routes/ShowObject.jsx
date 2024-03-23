import "../styles/showObject.css";

import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../ContextRoot";
import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const ShowObject = () => {
  const { objectId } = useParams(); // Hämta objektets ID från URL:en
  const [objectData, setObjectData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
      }
    };

    fetchObjectData(); // Kör funktionen för att hämta objektets data
  }, [objectId, setChangeButtonsOnView]);

  // Om objektData är null, visa en laddningsindikator eller ett meddelande
  if (!objectData) {
    return <p>Laddar...</p>;
  }

  const { name, producer, value, note, images } = objectData;

  const handleForwardClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleBackClick = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
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
          {images && (
            <div className="object-all-images">
              <span
                className="material-symbols-outlined back-arrow"
                onClick={() => handleBackClick()}
              >
                arrow_back_ios
              </span>
              <img
                className="big-img"
                src={images[currentIndex]}
                alt="Objekt bild"
              />
              <span
                className="material-symbols-outlined forward-arrow"
                onClick={() => handleForwardClick()}
              >
                arrow_forward_ios
              </span>
            </div>
          )}
         
          <div className="small-images">
            {images.slice(1).map((image, index) => (
              <img
                key={index}
                className="small-img"
                src={image}
                alt="Objekt bild"
              />
            ))}
          </div>
        </div>

        <div className="description-content section--spacer">
          <p className="standard__text-title">Anteckning</p>
          <p className="standard__text">{note}</p>
        </div>
      </section>
    </>
  );
};
