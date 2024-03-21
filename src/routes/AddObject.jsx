import React, { useEffect, useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../ContextRoot";
import { DisallowUserAccess } from "../components/DisallowUserAccess";
import "../styles/addObject.css";
import "../styles/object.css";

// För firebase
import { db } from "../firebaseConfig";
import { v4 } from "uuid";
import { getStorage, ref as storageRef, uploadBytes as storageUploadBytes, getDownloadURL as storageGetDownloadURL } from "firebase/storage";
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";

export const AddObject = () => {
  const { setChangeButtonsOnView, checkWhatCategoryIsUserOn, currentCategory } = useContext(AppContext);

  const navigate = useNavigate();
  const storage = getStorage();


  const [objectName, setObjectName] = useState("");
  const [objectProducer, setObjectProducer] = useState("");
  const [objectValue, setObjectValue] = useState("");
  const [objectNote, setObjectNote] = useState("");

  const [selectedImageOne, setSelectedImageOne] = useState(null);
  const [selectedImageTwo, setSelectedImageTwo] = useState(null);
  const [selectedImageThree, setSelectedImageThree] = useState(null);


  useEffect(() => {
    setChangeButtonsOnView("add-object");
  }, [setChangeButtonsOnView]);

  const handleImageChangeOne = (e) => {
    setSelectedImageOne(e.target.files[0]);
  };

  const handleImageChangeTwo = (e) => {
    setSelectedImageTwo(e.target.files[0]);
  };

  const handleImageChangeThree = (e) => {
    setSelectedImageThree(e.target.files[0]);
  };

  const areObjectRequirementsEmpty = objectName.trim() === "" || !selectedImageOne;
 // Funktion för att ladda upp objekt till Firebase
 const uploadObject = async () => {
  if (selectedImageOne && objectName.trim() !== "") {
    try {
      const imgRef = storageRef(storage, `objects/${v4()}`); // Använd storageRef från Firebase Storage
      const snapshot = await storageUploadBytes(imgRef, selectedImageOne, { // Använd storageUploadBytes från Firebase Storage
        contentType: "image/jpeg",
      });
      console.log("Image uploaded:", snapshot);

      const imageUrl = await storageGetDownloadURL(snapshot.ref); // Använd storageGetDownloadURL från Firebase Storage
      console.log("Image URL:", imageUrl);

      // TODO: Gör en if sats för att kolla om selectedImageTwo och selectedImageThree finns och ladda upp dem också
      let imageUrl2 = "";
      let imageUrl3 = ""; 
      
      if(selectedImageTwo){
        const imgRef2 = storageRef(storage,`objects/${v4()}` );
        const snapshot2 = await storageUploadBytes(imgRef2, selectedImageTwo, {
          contentType: "image/jpeg",
        });
        console.log("Image 2 uploaded:", snapshot2);
      
        imageUrl2 = await storageGetDownloadURL(snapshot2.ref)
        console.log("image URL 2:", imageUrl2); 
      }
      
      if(selectedImageThree){
        const imgRef3 = storageRef(storage,`objects/${v4()}` );
        const snapshot3 = await storageUploadBytes(imgRef3, selectedImageThree, {
          contentType: "image/jpeg",
        });
        console.log("Image 3 uploaded:", snapshot3);
      
        imageUrl3 = await storageGetDownloadURL(snapshot3.ref)
        console.log("image URL 3:", imageUrl3); 
      }
      
      const dbRef = collection(db, "objects");

        const generateObjectId = async (dbRef) => {
          let objectId = v4();

          let checkIfObjectIdExists = true;
          while (checkIfObjectIdExists) {
            const matchObjectId = query(dbRef, where("id", "==", objectId));
            const snapshot = await getDocs(matchObjectId);

            if (snapshot.empty) {
              checkIfObjectIdExists = false;
            } else {
              objectId = v4();
            }
          }

          return objectId;
        };
        const objectId = await generateObjectId(dbRef);

        await addDoc(dbRef, {
          id: objectId,
          linkedCategory: currentCategory,
          name: objectName,
          producer: objectProducer,
          value: objectValue,
          note: objectNote,
          images: [imageUrl, imageUrl2, imageUrl3], // TODO: Lägg till variablerna för bild 2 och 3 här
          // images: [imageUrl, imageUrl2, imageUrl3].filter(url => url), // Filter out empty URLs
        });
        navigate(`/object/${currentCategory}`); // Navigera till objektvyn när objektet är tillagt
      } catch (error) {
        console.error("Error:", error);
        // Hantera fel här
      }
    }
  };

  return (
    <section className="add-object__section section--spacer">
      <DisallowUserAccess />
      <div className="add-object__text-container">
        <h1 className="add-object__title">Skapa objekt</h1>
        <p className="add-object__info">
          Är i kategorin: {checkWhatCategoryIsUserOn}
        </p>
      </div>

      <form
        className="form__container 
      form__container--margin-bottom"
      >
        <div className="form-input-with-label-guideline__container">
          <div className="form-input-with-label__box">
            <label className="form__label" htmlFor="object-name__input">
              Namnge objektet*
            </label>

            <input
              type="text"
              id="object-name__input"
              className="form__input-text"
              placeholder="Heir of Fire"
              value={objectName}
              onChange={(e) => setObjectName(e.target.value)}
            />
          </div>

          <p className="add-object__guideline">Tex.: Boktitel, pokémonnamn.</p>
        </div>

        <div className="form-input-with-label-guideline__container">
          <div className="form-input-with-label__box">
            <label className="form__label" htmlFor="object-producer__input">
              Producent
            </label>

            <input
              type="text"
              id="object-producer__input"
              className="form__input-text"
              placeholder="Sara J Maas"
              value={objectProducer}
              onChange={(e) => setObjectProducer(e.target.value)}
            />
          </div>

          <p className="add-object__guideline">
            Tex.: Författare, skapare, tillverkare.
          </p>
        </div>

        <div className="form-input-with-label__box">
          <label className="form__label" htmlFor="object-value__input">
            Objektets värde i kronor
          </label>

          <input
            type="text"
            id="object-value__input"
            className="form__input-text"
            placeholder="249"
            value={objectValue}
            onChange={(e) => setObjectValue(e.target.value)}
          />
        </div>

        <div className="form-input-with-label__box">
          <label className="form__label" htmlFor="object-note__input">
            Anteckning
          </label>

          <textarea
            id="object-note__input"
            className="form__input-textarea"
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            value={objectNote}
            rows={4}
            onChange={(e) => setObjectNote(e.target.value)}
          />
        </div>

        <h2 className="standard__subtitle">Ladda upp bilder</h2>

        <div className="form-input-with-label__box form-input-with-label__box--upload">
          <label
            className="form__label"
            htmlFor="category-image-upload__input-one"
          >
            Ladda upp bild 1 på objektet*
          </label>

          <div className="form-upload-button-name__container box">
            <label
              className="form__upload-label"
              htmlFor="category-image-upload__input-one"
            >
              <span className="material-symbols-outlined upload">
                cloud_upload
              </span>
              <p className="upload__text">Välj bild</p>
            </label>
          </div>

          {/* Hide the default file input and made a custom one */}
          <input
            type="file"  
            id="category-image-upload__input-one"
            className="form__input-upload"
            accept="image/*"
            onChange={(e) => handleImageChangeOne(e)}
          />
        </div>

        <div className="form-input-with-label__box form-input-with-label__box--upload">
          <label
            className="form__label"
            htmlFor="category-image-upload__input-two"
          >
            Ladda upp bild 2 på objektet
          </label>

          <div className="form-upload-button-name__container box">
            <label
              className="form__upload-label"
              htmlFor="category-image-upload__input-two"
            >
              <span className="material-symbols-outlined upload">
                cloud_upload
              </span>
              <p className="upload__text">Välj bild</p>
            </label>

            <span className="material-symbols-outlined trash">delete</span>
          </div>

          {/* Hide the default file input and made a custom one */}
          <input
            type="file"
            id="category-image-upload__input-two"
            className="form__input-upload"
            accept="image/*"
            onChange={(e) => handleImageChangeTwo(e)}
          />
        </div>

        <div className="form-input-with-label__box form-input-with-label__box--upload">
          <label
            className="form__label"
            htmlFor="category-image-upload__input-three"
          >
            Ladda upp bild 3 på objektet
          </label>

          <div className="form-upload-button-name__container box">
            <label
              className="form__upload-label"
              htmlFor="category-image-upload__input-three"
            >
              <span className="material-symbols-outlined upload">
                cloud_upload
              </span>
              <p className="upload__text">Välj bild</p>
            </label>
            <span className="material-symbols-outlined trash">delete</span>
          </div>

          {/* Hide the default file input and made a custom one */}
          <input
            type="file"
            id="category-image-upload__input-three"
            className="form__input-upload"
            accept="image/*"
            onChange={(e) => handleImageChangeThree(e)}
          />
        </div>
      </form>

      <div className="add-object-image__container">
        {selectedImageOne && (
          <div className="add-object-image-text__container">
            <img
              src={URL.createObjectURL(selectedImageOne)}
              alt="Preview"
              className="add-object-image__preview"
            />
            <p className="add-object-image__text">Bild 1</p>
          </div>
        )}

        {selectedImageTwo && (
          <div className="add-object-image-text__container">
            <img
              src={URL.createObjectURL(selectedImageTwo)}
              alt="Preview"
              className="add-object-image__preview"
            />
            <p className="add-object-image__text">Bild 2</p>
          </div>
        )}

        {selectedImageThree && (
          <div className="add-object-image-text__container">
            <img
              src={URL.createObjectURL(selectedImageThree)}
              alt="Preview"
              className="add-object-image__preview"
            />
            <p className="add-object-image__text">Bild 3</p>
          </div>
        )}
      </div>

      <button
        type="button"
        className="fixed__button"
        onClick={() => uploadObject()}
        disabled={areObjectRequirementsEmpty}
        title="Slutför"
      >
        <span className="material-symbols-outlined round__button-icon">
          done
        </span>
      </button>
    </section>
  );
};
