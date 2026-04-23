import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [darkMode, setdarkMode] = useState(false);

  const darkModeHandler = () => {
    setdarkMode(!darkMode);
    document.body.classList.toggle("dark")
  };

  const providerValue = {
    darkMode,
    darkModeHandler,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
