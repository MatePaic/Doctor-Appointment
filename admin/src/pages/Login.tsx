import { useContext, useState } from 'react';
// @ts-ignore
import {assets} from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Login() {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const adminContext = useContext(AdminContext);

  if (!adminContext) {
    throw new Error('AdminContext is null. Please ensure it is properly initialized.');
  }

  const { setAdminToken, backendUrl } = adminContext;
  
  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
        if (state === 'Admin') {
            const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
                email,
                password
            });

            if (data.success) {
                localStorage.setItem('adminToken', data.token);
                setAdminToken(data.token);
            } else {
                toast.error(data.message);
            }
        }
    } catch (error) {
        console.log(error);
    }
  }
  
  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-[#5F6FFF]'>{state}</span> Login</p>
        <div className='w-full'>
            <p>Email</p>
            <input onChange={(e) => setEmail((e.target as HTMLInputElement).value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required/>
        </div>
        <div className='w-full'>
            <p>Password</p>
            <input onChange={(e) => setPassword((e.target as HTMLInputElement).value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required/>
        </div>
        <button className='bg-blue-500 text-white w-full py-2 rounded-md text-base cursor-pointer'>Login</button>
        {
            state === 'Admin' 
            ? <p>Doctor Login? <span className='text-[#5F6FFF] underline cursor-pointer' onClick={() => setState('Doctor')}>Click Here</span></p>
            : <p>Admin Login? <span className='text-[#5F6FFF] underline cursor-pointer' onClick={() => setState('Admin')}>Click Here</span></p>
        }
      </div>
    </form>
  )
}
