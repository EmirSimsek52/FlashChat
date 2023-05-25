import React,{useContext} from 'react'
import Navbar from './Navbar'
import { motion } from 'framer-motion';
import { animateX } from '../utils/motion';
import { AuthContext } from '../context/AuthContext';
import Search from './Search';
import Chats from './Chats';
import Chat from './Chat';

import InputText from './InputText';
function Home() {
  const {currentUser} = useContext(AuthContext)
  return (
    <motion.div
    animate={animateX()}
    
  >
      <Navbar/>
    <div className="items-center flex flex-col justify-center">
    <h1 className="text-color1 font-[600] text-6xl text-center mt-4  "> FLASHCHAT</h1>
    <div 
    className='m-8 bg-color3 text-white sm:text-xl text-sm   sm:w-[1200px] w-[380px]  
    flex self-center sm:h-[650px] h-[930px] sm:flex-row flex-col rounded-xl   '>
   
      <Search/>
      <div>
      <Chat/>
      <InputText/>
      </div>
  </div>  
  </div>

  </motion.div>
  )
}

export default Home