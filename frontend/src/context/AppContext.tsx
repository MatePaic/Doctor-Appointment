import { createContext, ReactNode } from "react";
// @ts-ignore
import { doctors } from "../assets/assets";
import { AppContextType } from "../models/appContextType";

export const AppContext = createContext<AppContextType>({
  doctors: [],
  currencySymbol: "$",
});

interface Props {
  children: ReactNode;
}

const AppContextProvider = ({ children }: Props) => {
  const currencySymbol = "$";
  const value = {
    doctors,
    currencySymbol,
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;