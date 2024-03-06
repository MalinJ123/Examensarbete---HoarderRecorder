import React, { createContext, useState, useEffect, useRef } from 'react';

export const AppContext = createContext();

export const ContextRoot = ({ children }) => {

    // User stuff
    const localStorageUser = 'user-session'

    const [username, setUsername] = useState('');

    const [userPassword, setUserPassword] = useState('');

    const [userProfilePicture, setUserProfilePicture] = useState('');

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const [authenticationView, setAuthenticationView] = useState('login');

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
    <AppContext.Provider value={{username, setUsername, userPassword, setUserPassword, userProfilePicture, setUserProfilePicture, isUserLoggedIn, setIsUserLoggedIn, authenticationView, setAuthenticationView, changeButtonsOnView, setChangeButtonsOnView, localStorageUser, userNotLoggedInDialogRef, stateUserNotLoggedInDialog}}>
      {children}
    </AppContext.Provider>
  );
};