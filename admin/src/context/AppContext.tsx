import { createContext, ReactNode } from "react";

export const AppContext = createContext();

interface Props {
  children: ReactNode;
}

const AppContextProvider = ({ children }: Props) => {
  const value = {
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;