import { useContext, useEffect } from "react";
import { ref, deleteObject } from "firebase/storage";
import { collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { db } from "../firebaseConfig";
import { imageDb } from "../firebaseConfig.js";
import { AppContext } from '../ContextRoot';
import { DisallowUserAccess } from "../components/DisallowUserAccess";

import "../styles/delete-account.css";

export const DeleteAccount = () => {

    const navigate = useNavigate();

    const { setAuthenticationView, setChangeButtonsOnView, setIsUserLoggedIn, setUsername, setUserPassword, setUserProfilePicture, setUserId, localStorageUser, userId } = useContext(AppContext);

    // Change the behavior the header's buttons depending on which view the user is currently on
    useEffect(() => {
        setChangeButtonsOnView('deletion');
    })

    // If user actually deletes their account
    const confirmedDeletionOfAccount = async () => {
      try {

        const dbRef = collection(db, "users");
        const matchUserId = query(dbRef, where("id", "==", userId));
        const snapshot = await getDocs(matchUserId);
    
        if (snapshot.empty) {
          return; 
        }
    
        const userDoc = snapshot.docs[0];
    
        const userData = userDoc.data();
        if (userData.userProfilePicture) {
          const storageRef = ref(imageDb, userData.userProfilePicture);
          await deleteObject(storageRef);
          console.log("Image deleted successfully");
        }
    
        await deleteDoc(userDoc.ref);

        setUsername('');
        setUserId('');
        setUserProfilePicture('');
        setUserPassword('');
        setIsUserLoggedIn(false);
        localStorage.removeItem(localStorageUser);
        setAuthenticationView('register');
        navigate('/');

        // TODO: Delete documents from collections "categories" and "objects" where the user id matches the user id of the user that is being deleted. Also remove all the images from the storage that are connected to the user that is being deleted.
    
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

                <p className="delete-account-info__title">Detta konto bli raderat:
                </p>

                <ul className="standard__list">

                  <li className="standard__list-element"><span className="bold__span">ditt konto</span> och <span className="bold__span">din data</span>,</li>

                  <li className="standard__list-element"><span className="bold__span">3</span> objekt inom <span className="bold__span">3</span> kategorier.</li>

                </ul>

                <button className="secondary__button user-btn" onClick={() => confirmedDeletionOfAccount()}>Bekräfta
                </button>

              </div>

      </section>

    )
}