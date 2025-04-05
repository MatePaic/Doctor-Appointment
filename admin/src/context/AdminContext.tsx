import { createContext, ReactNode, useState } from "react";
import { AdminContextType } from "../models/AdminContextType";

export const AdminContext = createContext<AdminContextType | null>(null);

interface Props {
  children: ReactNode;
}

const AdminContextProvider = ({ children }: Props) => {
  const [adminToken, setAdminToken] = useState<string>(localStorage.getItem('adminToken') || '');
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  const value = {
    adminToken,
    setAdminToken,
    backendUrl
  };
  
  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;