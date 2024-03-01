import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const ContextRoot = ({ children }) => {

    // User stuff
    const localStorageUser = 'user-session'

    const [username, setUsername] = useState('');

    const [userPassword, setUserPassword] = useState('');

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <AppContext.Provider value={{username, setUsername, userPassword, setUserPassword, isUserLoggedIn, setIsUserLoggedIn, localStorageUser}}>
      {children}
    </AppContext.Provider>
  );
};