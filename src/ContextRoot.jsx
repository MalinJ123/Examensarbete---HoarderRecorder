import { createContext } from 'react';

export const AppContext = createContext();

export const ContextRoot = ({ children }) => {



  return (
    <AppContext.Provider value={{}}>
      {children}
    </AppContext.Provider>
  );
};