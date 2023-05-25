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
            Explore the metaverse, a revolutionary digital realm where<br/> imagination knows no bounds.
            Immerse yourself in virtual experiences, 
            connect <br/>with a global community,
            and unlock endless possibilities in the metaverse.
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