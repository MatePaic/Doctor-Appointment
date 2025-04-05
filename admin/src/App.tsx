import { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";

export default function App() {
  const adminContext = useContext(AdminContext);

  if (!adminContext) {
    throw new Error("AdminContext must be used within a valid provider");
  }

  const { adminToken } = adminContext;
  
  return adminToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}
