import React, { createContext, useState, useEffect, useRef } from 'react';

export const AppContext = createContext();

export const ContextRoot = ({ children }) => {

    // User stuff
    const localStorageUser = 'user-session'

    const [username, setUsername] = useState('');

    const [userPassword, setUserPassword] = useState('');

    const [userProfilePicture, setUserProfilePicture] = useState('');

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
      const lsUSer = localStorage.getItem(localStorageUser);
      if (lsUSer) {
        const userData = JSON.parse(lsUSer);
        setUsername(userData.username);
        setUserPassword(userData.userPassword);
        setIsUserLoggedIn(userData.loggedIn)
      }
    })

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
    <AppContext.Provider value={{ username, setUsername, userPassword, setUserPassword, userProfilePicture, setUserProfilePicture, isUserLoggedIn, setIsUserLoggedIn, authenticationView, setAuthenticationView, checkWhatCategoryIsUserOn, setCheckWhatCategoryIsUserOn, changeButtonsOnView, setChangeButtonsOnView, localStorageUser, userNotLoggedInDialogRef, stateUserNotLoggedInDialog}}>
      {children}
    </AppContext.Provider>
  );
};