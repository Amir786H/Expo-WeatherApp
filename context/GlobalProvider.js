import React, { useState } from 'react';
import { GlobalContext } from './GlobalContext';

export const GlobalProvider = ({ children }) => {
  const [state, setState] = useState({
    theme: 'light', // Example global state
    user: null,     // Example user state
  });

  const toggleTheme = () => {
    setState((prevState) => ({
      ...prevState,
      theme: prevState.theme === 'light' ? 'dark' : 'light',
    }));
  };

  return (
    <GlobalContext.Provider value={{ state, setState, toggleTheme }}>
      {children}
    </GlobalContext.Provider>
  );
};