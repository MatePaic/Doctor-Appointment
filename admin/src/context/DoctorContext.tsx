import { createContext, ReactNode } from "react";

export const DoctorContext = createContext();

interface Props {
  children: ReactNode;
}

const DoctorContextProvider = ({ children }: Props) => {
  const value = {
  };
  
  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;