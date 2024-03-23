import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { v4 } from "uuid";
import { collection, query, where, getDocs, doc, updateDoc, endAt } from "firebase/firestore";

import { db, imageDb } from "../firebaseConfig";
import { AppContext } from "../ContextRoot";
import { DisallowUserAccess } from "../components/DisallowUserAccess";
import "../styles/editObject.css";



export const EditObject = () => {
  const navigate = useNavigate();
  const { objectId } = useParams();

  const { username, setChangeButtonsOnView, checkWhatCategoryIsUserOn,  userObjects, setUserObjects } = useContext(AppContext);

  useEffect(() => {
    setChangeButtonsOnView("edit-object");
  }, []);

  const selectObject = userObjects.find((object) => object.id === objectId);
  const oldObject = {...selectObject};

  // State variables
  const [objectName, setObjectName] = useState(oldObject.name || "");
  const [objectProducer, setObjectProducer] = useState(oldObject.producer || "");
  const [objectValue, setObjectValue] = useState(oldObject.value || "");
  const [objectNote, setObjectNote] = useState(oldObject.note || "");
  const [selectedImageOne, setSelectedImageOne] = useState(null);
  const [selectedImageTwo, setSelectedImageTwo] = useState(null);
  const [selectedImageThree, setSelectedImageThree] = useState(null);

  const [isSomethingChanged, setIsSomethingChanged] = useState(true);

  const handleObjectNameChange = (e) => {
    setObjectName(e.target.value);
  }

  const handleObjectProducerChange = (e) => {
    setObjectProducer(e.target.value);
    setIsSomethingChanged(false)
  }

  const handleObjectValueChange = (e) => {
    setObjectValue(e.target.value);
    setIsSomethingChanged(false)
  }

  const handleObjectNoteChange = (e) => {
    setObjectNote(e.target.value);
    setIsSomethingChanged(false)
  }

  const handleImageOneChange = (e) => {
    setSelectedImageOne(e.target.files[0]);
    setIsSomethingChanged(false);
  }

  const handleImageTwoChange = (e) => {
    setSelectedImageTwo(e.target.files[0]);
    setIsSomethingChanged(false);
  }

  const handleImageThreeChange = (e) => {
    setSelectedImageThree(e.target.files[0]);
    setIsSomethingChanged(false);
  }

  const updateObject = async () => {

    try {

      if (objectName.trim() !== "" || oldObject.name) {
        const dbRef = collection(db, "objects");
        const matchObjectById = query(dbRef, where("id", "==", objectId));
        const objectSnapshot = await getDocs(matchObjectById);
        const objectDocs = objectSnapshot.docs;

        if (objectDocs.length === 1) {

          const objectDoc = objectDocs[0];
          const objectDocRef = doc(db, "objects", objectDoc.id);

          let editedObjectData = {
            name: objectName || oldObject.name,
            producer: objectProducer  || oldObject.producer,
            value: objectValue || oldObject.value,
            note: objectNote  || oldObject.note,
            images: oldObject.images,
          };

          if (!selectedImageOne && !selectedImageTwo && !selectedImageThree) {

            console.log("No new images selected, updating only the object data");

          } else if (selectedImageOne && !selectedImageTwo && !selectedImageThree) {

            const imageOneRef = ref(imageDb, `objects/${username}-${objectName}-${v4()}`);
            await uploadBytes(imageOneRef, selectedImageOne);

            const snapshot = await uploadBytes(imageOneRef, selectedImageOne, {
              contentType: "image/jpeg",
            });
            
            const imageOneUrl = await getDownloadURL(snapshot.ref);

            const imageOneDelRef = ref(imageDb, oldObject.images[0]);
            await deleteObject(imageOneDelRef);
            console.log("Image deleted successfully");

            const filteredObjectImages = oldObject.images.filter((image) => image !== oldObject.images[0]);

            editedObjectData.images = [...filteredObjectImages, imageOneUrl];

          } else if (selectedImageOne && selectedImageTwo && !selectedImageThree) {

            const imageOneRef = ref(imageDb, `objects/${username}-${objectName}-${v4()}`);
            await uploadBytes(imageOneRef, selectedImageOne);

            const snapshotOne = await uploadBytes(imageOneRef, selectedImageOne, {
              contentType: "image/jpeg",
            });

            const imageOneUrl = await getDownloadURL(snapshotOne.ref);

            const imageOneDelRef = ref(imageDb, oldObject.images[0]);

            await deleteObject(imageOneDelRef);
            console.log("Image deleted successfully");

            const imageTwoRef = ref(imageDb, `objects/${username}-${objectName}-${v4()}`);
            await uploadBytes(imageTwoRef, selectedImageTwo);

            const snapshotTwo = await uploadBytes(imageTwoRef, selectedImageTwo, {
              contentType: "image/jpeg",
            });

            const imageTwoUrl = await getDownloadURL(snapshotTwo.ref);
            const imageTwoDelRef = ref(imageDb, oldObject.images[1]);

            await deleteObject(imageTwoDelRef);
            console.log("Image deleted successfully");

            const filteredObjectImages = oldObject.images.filter((image) => image !== oldObject.images[0] && image !== oldObject.images[1]);

            editedObjectData.images = [...filteredObjectImages, imageOneUrl, imageTwoUrl];

          } else if (selectedImageOne && selectedImageTwo && selectedImageThree) {

            const imageOneRef = ref(imageDb, `objects/${username}-${objectName}-${v4()}`);
            await uploadBytes(imageOneRef, selectedImageOne);

            const snapshotOne = await uploadBytes(imageOneRef, selectedImageOne, {
              contentType: "image/jpeg",
            });

            const imageOneUrl = await getDownloadURL(snapshotOne.ref);

            const imageOneDelRef = ref(imageDb, oldObject.images[0]);

            await deleteObject(imageOneDelRef);

            console.log("Image deleted successfully");

            const imageTwoRef = ref(imageDb, `objects/${username}-${objectName}-${v4()}`);

            await uploadBytes(imageTwoRef, selectedImageTwo);

            const snapshotTwo = await uploadBytes(imageTwoRef, selectedImageTwo, {
              contentType: "image/jpeg",
            });

            const imageTwoUrl = await getDownloadURL(snapshotTwo.ref);

            const imageTwoDelRef = ref(imageDb, oldObject.images[1]);

            await deleteObject(imageTwoDelRef);

            console.log("Image deleted successfully");

            const imageThreeRef = ref(imageDb, `objects/${username}-${objectName}-${v4()}`);

            await uploadBytes(imageThreeRef, selectedImageThree);

            const snapshotThree = await uploadBytes(imageThreeRef, selectedImageThree, {
              contentType: "image/jpeg",
            });

            const imageThreeUrl = await getDownloadURL(snapshotThree.ref);

            const imageThreeDelRef = ref(imageDb, oldObject.images[2]);

            await deleteObject(imageThreeDelRef);

            console.log("Image deleted successfully");

            const filteredObjectImages = oldObject.images.filter((image) => image !== oldObject.images[0] && image !== oldObject.images[1] && image !== oldObject.images[2]);

            editedObjectData.images = [...filteredObjectImages, imageOneUrl, imageTwoUrl, imageThreeUrl];

          }

          await updateDoc(objectDocRef, editedObjectData);

          const filteredObjects = userObjects.filter((object) => object.id !== oldObject.id);
          setUserObjects([...filteredObjects, editedObjectData]);

          navigate(`/object/${oldObject.categoryId}/show-object/${objectId}`);

        } else {
          console.error("No object with that id found");
        }
      }
    }
    catch (error) {
      console.error("Error updating object:", error);
    }
  }

  return (
    <section className="add-object__section section--spacer">
      <DisallowUserAccess />
      <div className="add-object__text-container">
        <h1 className="add-object__title">Redigera objekt</h1>
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
          className="form__input-text"
          placeholder="Heir of Fire"
          onChange={(e) => handleObjectNameChange(e)}
          value={objectName}
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
              onChange={(e) => handleObjectProducerChange(e)}
              value={objectProducer}
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
            onChange={(e) => handleObjectValueChange(e)}
            value={objectValue}
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
            onChange={(e) => handleObjectNoteChange(e)}
            rows={4}
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
            </label>
          </div>

          <input
            type="file"
            id="category-image-upload__input-one"
            className="form__input-upload"
            accept="image/*"
            onChange={(e) => handleImageOneChange(e)}
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
            </label>
            <span className="material-symbols-outlined trash">delete</span>
          </div>

          {/* Hide the default file input and made a custom one */}
          <input
            type="file"
            id="category-image-upload__input-two"
            className="form__input-upload"
            accept="image/*"
            onChange={(e) => handleImageTwoChange(e)}
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
            </label>
            <span className="material-symbols-outlined trash">delete</span>
          </div>

          {/* Hide the default file input and made a custom one */}
          <input
            type="file"
            id="category-image-upload__input-three"
            className="form__input-upload"
            accept="image/*"
            onChange={(e) => handleImageThreeChange(e)}
          />
        </div>
      </form>

      <div className="add-object-image__container">
        { oldObject.images && (
          <div className="add-object-image-text__container">
            <img
              alt="Preview"
              src={selectedImageOne ? URL.createObjectURL(selectedImageOne) : oldObject.images[0]}
              className="add-object-image__preview"
            />
            <p className="add-object-image__text">Bild 1</p>
          </div>
          )
        }

        { oldObject.images && oldObject.images[1] && (
          <div className="add-object-image-text__container">
            <img
              alt="Preview"
              src={selectedImageTwo ? URL.createObjectURL(selectedImageTwo) : oldObject.images[1]}
              className="add-object-image__preview"
            />
            <p className="add-object-image__text">Bild 2</p>
          </div>
          )
        }

        { oldObject.images && oldObject.images[2] && (
          <div className="add-object-image-text__container">
            <img
              alt="Preview"
              src={selectedImageThree ? URL.createObjectURL(selectedImageThree) : oldObject.images[2]}
              className="add-object-image__preview"
                />
                    <p className="add-object-image__text">Bild 3</p>
                  </div>
          )
        }
      </div>

      <button
        className="fixed__button"
        type="button"
        title="Slutför"
        onClick={() => updateObject()}
        disabled={isSomethingChanged}
      >
        <span className="material-symbols-outlined round__button-icon">
          done
        </span>
      </button>
    </section>
  );
};
