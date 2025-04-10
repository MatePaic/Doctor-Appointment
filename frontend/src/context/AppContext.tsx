import { createContext, ReactNode, useEffect, useState } from "react";
import { AppContextType } from "../models/appContextType";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext<AppContextType>({
  doctors: [],
  currencySymbol: "",
});

interface Props {
  children: ReactNode;
}

const AppContextProvider = ({ children }: Props) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);

  const value = {
    doctors,
    currencySymbol,
  };

  const getDoctorsData = async () => {
    try {
      const {data} = await axios.get(backendUrl + '/api/doctor/list');
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  }

  useEffect(() => {
    getDoctorsData();
  }, [])
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;