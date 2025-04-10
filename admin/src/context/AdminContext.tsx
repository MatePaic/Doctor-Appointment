import { createContext, ReactNode, useState } from "react";
import { AdminContextType } from "../models/adminContextType";
import axios from "axios";
import {toast} from 'react-toastify';

export const AdminContext = createContext<AdminContextType | null>(null);

interface Props {
  children: ReactNode;
}

const AdminContextProvider = ({ children }: Props) => {
  const [adminToken, setAdminToken] = useState<string>(localStorage.getItem('adminToken') || '');
  const [doctors, setDoctors] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  const getAllDoctors = async () => {
    try {
      const {data} = await axios.post(backendUrl + '/api/admin/all-doctors', {}, {headers: {adminToken}});
      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  }

  const changeAvailability = async (docId: string) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/change-availability', {docId}, {headers: {adminToken}});
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  }

  const value = {
    adminToken,
    setAdminToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability
  };
  
  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;