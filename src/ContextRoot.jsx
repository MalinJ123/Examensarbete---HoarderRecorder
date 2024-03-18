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

    useEffect(() => {
      const dbRef = collection(db, "users");
    
      const lsFunction = async () => {
        const lsUser = localStorage.getItem(localStorageUser);
        if (lsUser) {
          const userData = JSON.parse(lsUser);
          setUsername(userData.username || '');
          setUserId(userData.id || '');
          setIsUserLoggedIn(userData.loggedIn || false);
          setUserProfilePicture(userData.userPicture || '');
    
          // Check if the user is logged in and fetch the profile image from the database
          if (userData.loggedIn) {
            const matchUserId = query(dbRef, where("id", "==", userData.id));
            const snapshot = await getDocs(matchUserId);
            snapshot.forEach((doc) => {
              // Update the userProfilePicture in localStorageUser with the profile image from the database
              const profilePicture = doc.data().userProfilePicture;
              localStorage.setItem(localStorageUser, JSON.stringify({
                ...userData,
                userPicture: profilePicture
              }));
              setUserProfilePicture(profilePicture);
            });
          }
        }
      };
    
      lsFunction();
    }, []);

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
    <AppContext.Provider value={{ username, setUsername, userPassword, setUserPassword, userId, setUserId, userProfilePicture, setUserProfilePicture, isUserLoggedIn, setIsUserLoggedIn, authenticationView, setAuthenticationView, checkWhatCategoryIsUserOn, setCheckWhatCategoryIsUserOn, changeButtonsOnView, setChangeButtonsOnView, localStorageUser, userNotLoggedInDialogRef, stateUserNotLoggedInDialog}}>
      {children}
    </AppContext.Provider>
  );
};