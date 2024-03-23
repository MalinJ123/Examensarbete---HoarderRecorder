import { useContext, useEffect } from "react";
import { ref, deleteObject } from "firebase/storage";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { db } from "../firebaseConfig";
import { imageDb } from "../firebaseConfig.js";
import { AppContext } from '../ContextRoot';
import { DisallowUserAccess } from "../components/DisallowUserAccess";

import "../styles/delete-account.css";

export const DeleteAccount = () => {

    const navigate = useNavigate();

    const { setAuthenticationView, setChangeButtonsOnView, setIsUserLoggedIn, setUsername, setUserPassword, setUserProfilePicture, setUserId, localStorageUser, userId, setUserCategories, setUserObjects } = useContext(AppContext);

    // Change the behavior the header's buttons depending on which view the user is currently on
    useEffect(() => {
        setChangeButtonsOnView('deletion');
    })

    // If user actually deletes their account
    const confirmedDeletionOfAccount = async () => {
      try {
    
        // Find the user in the database
        const dbUserRef = collection(db, "users");
        const matchUserId = query(dbUserRef, where("id", "==", userId));
        const snapshot = await getDocs(matchUserId);
    
        const dbCategoriesRef = collection(db, "categories");
        const matchCategories = query(dbCategoriesRef, where("userId", "==", userId));
        const categoriesSnapshot = await getDocs(matchCategories);

        let categoryId;
        let categoriesData;
    
        const userDoc = snapshot.docs[0];
        const userData = userDoc.data();
        if (userData.userProfilePicture) {
          const userImageRef = ref(imageDb, userData.userProfilePicture);
          await deleteObject(userImageRef);
          console.log("User profile picture deleted successfully");
        }
    
        if (categoriesSnapshot.empty) {
          console.log("User has no categories, proceeding with deletion.");
          await deleteDoc(snapshot.docs[0].ref);
          setUsername('');
          setUserCategories([]);
          setUserObjects([]);
          setUserId('');
          setUserProfilePicture('');
          setUserPassword('');
          setIsUserLoggedIn(false);
          localStorage.removeItem(localStorageUser);
          setAuthenticationView('register');
          navigate('/');
          console.log("User account successfully deleted!");
          return;
        } else {
            const categoryDoc = categoriesSnapshot.docs[0];
            categoriesData = categoryDoc.data();
            categoryId = categoriesSnapshot.docs[0].data().id;
        }
    
        const deleteCategories = async () => {
    
          // Delete category image
          if (categoriesData.image) {
            const storageRef = ref(imageDb, categoriesData.image);
            try {
              await deleteObject(storageRef);
              console.log("Category image deleted successfully");
            } catch (error) {
              if (error.code === "storage/object-not-found") {
                console.error("Category image not found, continuing deletion.");
              } else {
                // Handle other errors
                console.error("Error deleting category image:", error);
              }
            }
          }
        
          await deleteDoc(doc(db, "categories", categoryId));
          console.log("Category deleted successfully");
        };
    
        const dbObjectsRef = collection(db, "objects");
        const matchObjectsByLinkedCategory = query(dbObjectsRef, where("linkedCategory", "==", categoryId));
        const objectsSnapshot = await getDocs(matchObjectsByLinkedCategory);

        const deletePromises = [];
    
        if (!objectsSnapshot.empty) {
          objectsSnapshot.forEach(async (doc) => {
            const objectData = doc.data();
    
            const imageUrls = objectData.images;
    
            for (const imageUrl of imageUrls) {
              const imageRef = ref(imageDb, imageUrl);
              await deleteObject(imageRef);
              console.log("Image deleted successfully");
            }
    
            await deleteDoc(doc.ref);
            console.log("Object deleted successfully");

            deletePromises.push(deleteCategories());
    
            deleteCategories();
          });
        } else {
          console.log("No objects found in this category");

          deletePromises.push(deleteCategories());

          deleteCategories();
        }

        await Promise.all(deletePromises);
    
        // Delete the user document
        await deleteDoc(userDoc.ref);
    
        setUsername('');
        setUserCategories([]);
        setUserObjects([]);
        setUserId('');
        setUserProfilePicture('');
        setUserPassword('');
        setIsUserLoggedIn(false);
        localStorage.removeItem(localStorageUser);
        setAuthenticationView('register');
        navigate('/');
    
        console.log("User account successfully deleted!");
      } catch (error) {
        console.error("Error deleting user data:", error);
      }
    };
    
    
    return (

        <section className="delete-account__section">

             <DisallowUserAccess />
             
            <h1 className="standard__title"><span className="material-symbols-outlined big__icon">
            warning
            </span></h1>

            <h1 className="standard__title">Vill du lämna oss? 😢</h1>
        
            <p className="delete-account-info__text">
            Alla dina kontouppgifter, kategorier och objekt som du har gjort, kommer att raderas!
            </p>

            <div className="delete-account-center__box">
                <button className="secondary__button user-btn" onClick={() => confirmedDeletionOfAccount()}>Bekräfta
                </button>

              </div>

      </section>

    )
}