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
  const [loading, setLoading] = useState(true);

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

    setLoading(false);
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

  let smallImageIndex = currentIndex - 1;
  if (smallImageIndex < 0) {
    smallImageIndex = images.length - 1;
  }
  
  let smallImageIndex2 = currentIndex + 1;
  if (smallImageIndex2 === images.length) {
    smallImageIndex2 = 0;
  }

  if (loading) {
    return <p>Hämtar och laddar data . . .</p>;
  }
  
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
              <div className="big__image-container" style={{backgroundImage: `url(${images[currentIndex]})`}}>
              {
                images.length > 1 && (
                  <>
                    <span
                      className="material-symbols-outlined arrow"
                      onClick={() => handleBackClick()}
                    >
                      arrow_back_ios
                    </span>
                      <span className="material-symbols-outlined arrow" onClick={() => handleForwardClick()}>
                        arrow_forward_ios
                    </span>
                  </>
                )
              }
              </div>
            )}
            {images.length > 1 && (
              <img
                className="small-img"
                src={images[smallImageIndex2]}
                alt="Föregående bild"
              />
            )}
            {images.length > 1 && (
              <img
                className="small-img"
                src={images[smallImageIndex]}
                alt="Nästa bild"
              />
            )}
        </div>
  
        <div className="description-content section--spacer">
          <p className="standard__text-title">Anteckning</p>
          <p className="standard__text">{note}</p>
        </div>
      </section>
    </>
  );
}