import React, { createContext, useState, useEffect, useRef } from 'react';
import { getDocs, collection, where, query } from "firebase/firestore";

import { db } from "./firebaseConfig";

export const AppContext = createContext();

export const ContextRoot = ({ children }) => {

    // User stuff
    const localStorageUser = 'user-session'

    const [username, setUsername] = useState('');

    const [userPassword, setUserPassword] = useState('');

    const [userId, setUserId] = useState('');

    const [userProfilePicture, setUserProfilePicture] = useState('');

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const [userCategories, setUserCategories] = useState([]);

    const [currentCategory, setCurrentCategory] = useState('');

    const handleLSUserData = async () => {
      try {
        const lsUser = localStorage.getItem(localStorageUser);
        if (lsUser) {
          const userData = JSON.parse(lsUser);
          setUsername(userData.username || '');
          setUserId(userData.id || '');
          setIsUserLoggedIn(userData.loggedIn || false);
    
          // Check for profile picture in both local storage and user data
          if (userData.loggedIn) {
            const storedProfilePicture = userData.userProfilePicture;
            const hasProfilePictureInLS = storedProfilePicture && localStorage.getItem(localStorageUser)?.userProfilePicture;
    
            if (!hasProfilePictureInLS) {

              const dbRef = collection(db, "users");
              const matchUserId = query(dbRef, where("id", "==", userData.id));
              const snapshot = await getDocs(matchUserId);
              snapshot.forEach((doc) => {
                const profilePicture = doc.data().userProfilePicture;
                localStorage.setItem(localStorageUser, JSON.stringify({
                  ...userData,
                  userProfilePicture: profilePicture
                }));
                setUserProfilePicture(profilePicture);
              });
            } else {
              // Use profile picture from local storage if available
              setUserProfilePicture(storedProfilePicture);
            }
          }
        }
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    };

    useEffect(() => {
      handleLSUserData();
    }, [isUserLoggedIn]);

    const [authenticationView, setAuthenticationView] = useState('login');

    // Check what category the user is currently on with the help of the database
    const [checkWhatCategoryIsUserOn, setCheckWhatCategoryIsUserOn] = useState('');

    // Change the behavior the header's buttons depending on which view the user is currently on
    const [changeButtonsOnView, setChangeButtonsOnView] = useState('');

    // Dialogs
    const userNotLoggedInDialogRef = useRef();

    const stateUserNotLoggedInDialog = (state) => {
      if (state) {
        userNotLoggedInDialogRef.current.showModal();
      } else {
        userNotLoggedInDialogRef.current.close();
      }
    }

  return (
    <AppContext.Provider value={{ username, setUsername, userPassword, setUserPassword, userId, setUserId, userProfilePicture, setUserProfilePicture, isUserLoggedIn, setIsUserLoggedIn, userCategories, setUserCategories, currentCategory, setCurrentCategory, authenticationView, setAuthenticationView, checkWhatCategoryIsUserOn, setCheckWhatCategoryIsUserOn, changeButtonsOnView, setChangeButtonsOnView, localStorageUser, userNotLoggedInDialogRef, stateUserNotLoggedInDialog}}>
      {children}
    </AppContext.Provider>
  );
};