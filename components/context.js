import React, { useState, createContext, useContext } from 'react';

const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState({});
  return (
    <AppContext.Provider value={(user, setUser)}>
      {children}
    </AppContext.Provider>
  );
}

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
