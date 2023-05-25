import React from 'react'
import { Link } from 'react-router-dom'
import { animateY } from '../utils/motion';
import { motion } from 'framer-motion';
function WelcomPage() {
  return (
    <motion.div 
      animate={animateY}
    className='text-center'
    >
        <h1 className='text-color1 mt-10 sm:text-[100px] text-[60px] text-center font-bold justify-center'>WELCOME</h1>
        <h1  className='text-color1 sm:mt-[-60px] mt-[-40px] sm:text-[100px] text-[60px] text-center font-bold justify-center'>FLASHCHAT</h1>
        <label className='text-[white] items-center sm:m-0 m-5'> 
        Introducing the perfect chat app for seamless communication! <br/> Connect effortlessly with friends and loved ones, and enjoy a user-friendly interface
         <br/>that makes staying in touch a breeze.  Let's get start and experience the joy of effortless conversations.
        </label>
        <p/>
        <button 
        className='bg-color2 mt-10 px-4 py-2 text-white border-2 border-white hover:bg-color1 
        hover:border-color1 duration-300 hover:text-color2 rounded-xl hover:px-10 hover:font-bold font-[600]' >
            <Link to="/login" >
            Get Start
            </Link>
        </button>
        </motion.div>
  )
}

export default WelcomPage