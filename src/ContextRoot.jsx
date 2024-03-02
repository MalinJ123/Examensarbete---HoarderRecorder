import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const ContextRoot = ({ children }) => {

    // User stuff
    const localStorageUser = 'user-session'

    const [username, setUsername] = useState('');

    const [userPassword, setUserPassword] = useState('');

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    // Change the behavior the header's buttons depending on which view the user is currently on
    const [changeButtonsOnView, setChangeButtonsOnView] = useState('');

  return (
    <AppContext.Provider value={{username, setUsername, userPassword, setUserPassword, isUserLoggedIn, setIsUserLoggedIn, changeButtonsOnView, setChangeButtonsOnView, localStorageUser}}>
      {children}
    </AppContext.Provider>
  );
};