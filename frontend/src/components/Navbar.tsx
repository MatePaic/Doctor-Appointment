import { useState } from 'react';
// @ts-ignore
import {assets} from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt='logo'/>
      <ul className="hidden md:flex items-start gap-5 font-medium">
        {["home", "doctors", "about", "contact"].map((link) => (
          <NavLink
            key={link}
            to={link === "home" ? '/' : `/${link}`}
            className={({ isActive }) =>
              `relative text-black font-medium ${
                isActive ? "after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-2px] after:h-[2px] after:bg-blue-500" : ""
              }`
            }
          >
            <li className='py-1'>{link.toUpperCase()}</li>
          </NavLink>
        ))}
      </ul>
      <div>
        <div className='flex-items-center gap-4'>
          {
            token ? <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-8 rounded-full' src={assets.profile_pic} alt=""/>
              <img className='w-2.5' src={assets.dropdown_icon} alt=""/>
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                  <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                  <p onClick={() => navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                  <p onClick={() => setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
            : <button onClick={() => navigate('/login')} 
                className="px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                Create account
              </button>
          }
        </div>
      </div>
    </div>
  )
}
