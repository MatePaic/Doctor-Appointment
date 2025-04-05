// @ts-ignore
import {assets} from '../assets/assets';
import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const adminContext = useContext(AdminContext);

  if (!adminContext) {
    throw new Error('AdminContext must be used within a valid AdminContextProvider');
  }

  const { adminToken, setAdminToken } = adminContext;
  const navigate = useNavigate();
  
  const logout = () => {
    navigate('/');
    adminToken && setAdminToken('');
    adminToken && localStorage.removeItem('adminToken');
  }

  return (
    <div className='flex justify-between items-center bg-white px-4 sm:px-10 py-3 border-b'>
      <div className='flex items-center gap-2 text-xs'>
        <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="admin_logo" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{adminToken ? 'Admin' : 'Doctor'}</p>
      </div>
      <button onClick={logout} className='bg-blue-500 text-white text-sm px-10 py-2 rounded-full cursor-pointer'>Logout</button>
    </div>
  )
}
