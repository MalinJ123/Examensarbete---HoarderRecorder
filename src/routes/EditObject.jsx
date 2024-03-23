import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { v4 } from "uuid";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db, imageDb } from "../firebaseConfig";

import { AppContext } from "../ContextRoot";
import { DisallowUserAccess } from "../components/DisallowUserAccess";
import "../styles/editObject.css";



export const EditObject = () => { 
  // Tillbaka knapp i headern från den här sidan 
  const navigate = useNavigate();
  const { setChangeButtonsOnView, checkWhatCategoryIsUserOn,  userObjects, setUserObjects } = useContext(AppContext);
  const { id } = useParams();


    // Fetching object data
    const selectObject = userObjects.find((object) => object.id === id);
    const oldObject = {...selectObject};

  // State variables
  const [objectName, setObjectName] = useState(oldObject.name || "");
  const [objectProducer, setObjectProducer] = useState(oldObject.producer || "");
  const [objectValue, setObjectValue] = useState(oldObject.value || "");
  const [objectNote, setObjectNote] = useState(oldObject.note || "");
  const [selectedImages, setSelectedImages] = useState([]);
  const [isSomethingChanged, setIsSomethingChanged] = useState(true);

  const [previewSelectedImageOne, setPreviewSelectedImageOne] = useState(null);
  const [selectedImageNameOne, setSelectedImageNameOne] = useState("");
  const [hasSelectedImageOne, setHasSelectedImageOne] = useState(false);

  const [previewSelectedImageTwo, setPreviewSelectedImageTwo] = useState(null);
  const [selectedImageNameTwo, setSelectedImageNameTwo] = useState("");
  const [hasSelectedImageTwo, setHasSelectedImageTwo] = useState(false);

  const [previewSelectedImageThree, setPreviewSelectedImageThree] =
    useState(null);
  const [selectedImageNameThree, setSelectedImageNameThree] = useState("");
  const [hasSelectedImageThree, setHasSelectedImageThree] = useState(false);

  const [selectedObject, setSelectedObject] = useState(null);

useEffect(() => {
  console.log("ID från useParams():", id);
  console.log("Userobjekt:", userObjects);
  const objectId = parseInt(id);

  // Här filtrerar vi userObjects baserat på ID från useParams()
 const selectObject = userObjects.find((object) => object.id === objectId);

  console.log("Selected Object:", selectObject); // Loggar det valda objektet
 


  if (selectObject) {
    console.log("Setting objectName:", selectObject.name);
    console.log("Setting objectProducer:", selectObject.producer);
    console.log("Setting objectValue:", selectObject.value);
    console.log("Setting objectNote:", selectObject.note);
    console.log("Setting selectedImages:", selectObject.images);
    
    setObjectName(selectObject.name || "");
    setObjectProducer(selectObject.producer || "");
    setObjectValue(selectObject.value || "");
    setObjectNote(selectObject.note || "");
    setSelectedImages(selectObject.images || []);
    setSelectedObject(selectObject);
   } else {
     
      console.log("Objektet med ID", objectId, "hittades inte.");
    }
  }, [id, userObjects]);


      // Function to handle changes in form fields
      const handleInputChange = (e, setterFunction) => {
        setterFunction(e.target.value);
        setIsSomethingChanged(false);
      };
    // Function to handle image uploads
    const handleImageChange = (e, imageIndex) => {
      const files = e.target.files;
      const urls = [];
      for (const file of files) {
        const reader = new FileReader();
        reader.onloadend = () => {
          urls.push(reader.result);
          if (urls.length === files.length) {
            setSelectedImages(prevImages => {
              const updatedImages = [...prevImages];
              updatedImages[imageIndex] = urls[0];
              return updatedImages;
            });
            setIsSomethingChanged(false);
          }
        };
        reader.readAsDataURL(file);
      }
    };

     // Function to update the object
     const updateObject = async () => {
      try {
        navigate("/object");
      } catch (error) {
        console.error("Error updating object:", error);
      }
    };

    const handleImageChangeOne = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewSelectedImageOne(reader.result);
        };
        reader.readAsDataURL(file);
  
        setSelectedImageNameOne(file.name);
        setHasSelectedImageOne(true);
      } else {
        setPreviewSelectedImageOne(null);
        setSelectedImageNameOne("");
        setHasSelectedImageOne(false);
      }
    };

  // const handleImageChangeOne = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreviewSelectedImageOne(reader.result);
  //     };
  //     reader.readAsDataURL(file);

  //     setSelectedImageNameOne(file.name);
  //     setHasSelectedImageOne(true);
  //   } else {
  //     setPreviewSelectedImageOne(null);
  //     setSelectedImageNameOne("");
  //     setHasSelectedImageOne(false);
  //   }
  // };

  // const handleImageChangeTwo = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreviewSelectedImageTwo(reader.result);
  //     };
  //     reader.readAsDataURL(file);

  //     setSelectedImageNameTwo(file.name);
  //   } else {
  //     setPreviewSelectedImageTwo(null);
  //     setSelectedImageNameTwo("");
  //   }
  // };

  // const handleImageChangeThree = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreviewSelectedImageThree(reader.result);
  //     };
  //     reader.readAsDataURL(file);

  //     setSelectedImageNameThree(file.name);
  //     setHasSelectedImageThree(true);
  //   } else {
  //     setPreviewSelectedImageThree(null);
  //     setSelectedImageNameThree("");
  //     setHasSelectedImageThree(false);
  //   }
  // };

  const GoToCompletedObject = () => {
    navigate("/object");
  };



  return (
    <section className="add-object__section section--spacer">
      <DisallowUserAccess />
      <div className="add-object__text-container">
        <h1 className="add-object__title">Redigera objekt</h1>
        {/* <p className="add-object__info">
          Är i kategorin:{checkWhatCategoryIsUserOn}
        </p> */}
        <p className="add-object__info">
          Är i kategorin:{oldObject.name}

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
          className="form__input-text"
          placeholder="Object Name"
          value={objectName}
          onChange={(e) => handleInputChange(e, setObjectName)}
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
              onChange={(e) => handleInputChange(e, setObjectProducer)}
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
            onChange={(e) => handleInputChange(e, setObjectValue)}
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
            onChange={(e) => handleInputChange(e, setObjectNote)}
          />
        </div>

        <div className="add-object__text-container">
          <h2 className="standard__subtitle">Redigera befintliga bilder</h2>
        </div>

        {/* bild 1  */}
        <div className="form-input-with-label__box form-input-with-label__box--upload">
          <label
            className="form__label"
            htmlFor="category-image-upload__input-one"
          >
            Ladda upp bild 1
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

            <label
              className="form__selected-file__label"
              htmlFor="category-image-upload__input-one"
            >
              {selectedImageNameOne}
            </label>
            <span className="material-symbols-outlined trash">delete</span>
          </div>

      
          <input
            type="file"
            id="category-image-upload__input-one"
            className="form__input-upload"
            accept="image/*"
            onChange={(e) => handleImageChange(e, 0)}
          />
        </div>

        {/* bild 2  */}
        <div className="form-input-with-label__box form-input-with-label__box--upload">
          <label
            className="form__label"
            htmlFor="category-image-upload__input-two"
          >
            Ladda upp bild 2
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

            <label
              className="form__selected-file__label"
              htmlFor="category-image-upload__input-two"
            >
              {selectedImageNameTwo}
            </label>
            <span className="material-symbols-outlined trash">delete</span>
          </div>

          {/* Hide the default file input and made a custom one */}
          <input
            type="file"
            id="category-image-upload__input-two"
            className="form__input-upload"
            accept="image/*"
            onChange={(e) => handleImageChange(e, 1)}
          />
        </div>

        {/* bild 3 */}

        <div className="form-input-with-label__box form-input-with-label__box--upload lastchild">
          <label
            className="form__label"
            htmlFor="category-image-upload__input-two"
          >
            Ladda upp bild 3
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

            <label
              className="form__selected-file__label"
              htmlFor="category-image-upload__input-three"
            >
              {selectedImageNameThree}
            </label>
            <span className="material-symbols-outlined trash">delete</span>
          </div>

          {/* Hide the default file input and made a custom one */}
          <input
            type="file"
            id="category-image-upload__input-three"
            className="form__input-upload"
            accept="image/*"
            onChange={(e) => handleImageChange(e, 2)}
          />
        </div>
      </form>


        {/* Display selected images */}
        <div className="edit-object__image-preview">
        {selectedImages.map((image, index) => (
          <img key={index} src={image} alt={`Image ${index}`} />
        ))}
      </div>

      <div className="images-content">
        <div className="add-category-image__container">
          {previewSelectedImageOne && (
            <img
              src={previewSelectedImageOne}
              alt="Preview"
              className="add-category-image__preview smallpic"
            />
          )}
        </div>

        <div className="add-category-image__container">
          {previewSelectedImageTwo && (
            <img
              src={previewSelectedImageTwo}
              alt="Preview"
              className="add-category-image__preview smallpic"
            />
          )}
        </div>

        <div className="add-category-image__container">
          {previewSelectedImageThree && (
            <img
              src={previewSelectedImageThree}
              alt="Preview"
              className="add-category-image__preview smallpic"
            />
          )}
        </div>
      </div>

      <button
        className="fixed__button"
        type="button"
        onClick={() => updateObject()}
        disabled={isSomethingChanged}
        title="Slutför"
      >
        <span className="material-symbols-outlined round__button-icon">
          done
        </span>
      </button>
    </section>
  );
};
