import React, {useContext, useState} from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Link } from "react-router-dom";
import * as Login from './Login';
import { AuthContext } from '../context/AuthContext';
import {signOut} from "firebase/auth";
import { auth } from '../firebase'
import { motion } from 'framer-motion';
import { animateX } from '../utils/motion';
import {  SiStackblitz } from "react-icons/si";
function Navbar(){
    const [nav, setNav] = useState(false)
    const handleNav = () => {
        setNav(!nav)
    }

    const {currentUser} = useContext(AuthContext)
    const variants = {
      open: { opacity: 1, x: 0 },
      closed: { opacity: 0, x: "-100%" },
    }


  return (
    <div className=' w-full h-[90px] bg-color3 '>
      <div className='max-w-[1240px] mx-auto px-5 flex justify-between items-center h-full'>
     
        <div className='flex justify-start'>
          <SiStackblitz size={30} className='text-color1 mr-2'/>
          <h1 className='text-color1 text-2xl'>FlashChat</h1>
          
        </div>
      
        <div className='hidden md:flex'>
            <ul className=' flex text-white items-center cursor-pointer'>
            
            <li className='sm:pl-10 pl-5'>
              {AuthContext ? 
              <div className='flex flex-row'>
                <li>
              <img className='w-12 h-12 mb-[-30px] rounded-lg' src={currentUser.photoURL} /> 
              </li>
              <li className='mt-5'>
              <span className='m-3 mt-5'>{currentUser.displayName}</span>
              </li>
              <li className='mt-4'>
              <button
              onClick={()=>signOut(auth)}
              className=' px-2 border-2 border-white hover:bg-color1 hover:border-color1 hover:px-4 duration-300'>
                <Link to="/welcome">
                  Logout
                </Link>
              </button>
              </li>
              </div>:      <button className="border-2 p-[5px] border-color3 px-5 hover:bg-color1 duration-300 ">
                  <Link to="/login">
                Login
                   </Link>     </button>   }
             
            </li>
       
          </ul>
        </div>

        {/* Hamburger menu */}
        <div onClick={handleNav} className='block md:hidden'>
            {nav ? <AiOutlineClose size={30} className='text-color1' /> : <AiOutlineMenu size={30} className='text-color1' />}
          
          
        </div>

        {/* Mobile Menu */}
        <motion.div 
       animate={animateX()}
        className={nav ? 'bg-color3 py-1 px-2 rounded-3x2 w-full  text-white absolute top-[90px] left-0 flex justify-center text-center' : 
    'absolute left-[-100%]'}>
          <ul>
          
            
            <li className='mt-2 pb-2'>
            </li>
            {AuthContext ? 
            <div>
              <li>
            <img className='w-12 h-12 ml-4 rounded-xl' src={currentUser.photoURL} /> 
              </li>
              <li>
              <span>{currentUser.displayName}</span>
              </li>
              <li>
              <button
              onClick={()=>signOut(auth)}
              className=' px-3 border-2 border-white hover:bg-color1 hover:border-color1 duration-300'>
                <Link to="/welcome">
                  Logout
                </Link>
              </button>
              </li>
            </div> :     <button className="border-2 p-[5px] px-4 hover:bg-color1 duration-300 ">
                <Link to="/login">
                    Login
                 </Link>     </button> 
               }
       
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Navbar;