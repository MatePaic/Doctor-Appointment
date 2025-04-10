// @ts-ignore
import { assets } from '../assets/assets';

export default function Footer() {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* ----- Left Section -------- */}
        <div>
            <img className='mb-5 w-40' src={assets.logo} alt="logo"/>
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam voluptatum labore sunt debitis fugit. Laboriosam aperiam sequi alias facere pariatur placeat, nam dignissimos optio? Vero, laborum aliquam? Enim, sint porro.</p>
        </div>

        {/* ----- Central Section -------- */}
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Contact us</li>
                <li>Privacy policy</li>
            </ul>
        </div>

        {/* ----- Right Section -------- */}
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+1-212-456-7890</li>
                <li>greatstackdev@gmail.com</li>
            </ul>
        </div>
      </div>

      {/* ----- Copyright Text -------- */}
      <div>
        <hr className='bg-zinc-400 h-[1px] border-none'/>
        <p className='py-5 text-sm text-center'>Copyright 2025@ Prescripto - All Right Reserved.</p>
      </div>
    </div>
  )
}
