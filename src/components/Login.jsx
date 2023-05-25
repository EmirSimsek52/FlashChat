import React,{useState} from 'react';
import {ImUser} from "react-icons/im";
import {IoFingerPrintOutline } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { animateY } from '../utils/motion';
import { motion } from 'framer-motion';
import { FiMail,FiPhone } from "react-icons/fi";
function Login() {
  const [router, setRouter]=useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home")
      setRouter(true)
    } catch (err) {
      setErr(true);
    }
  };
  return (
            <motion.div 
            animate={animateY()}
            className=" flex flex-col items-center sm: mt-[150px] text-center">
            <h1 className='text-color1 text-[50px] mb-5'>Login</h1>
            <div className="formContainer">
      <div className="flex flex-col">
          <form onSubmit={handleSubmit}>
            <label className='text-color1 flex flex row border-b-2 border-color1 '>
            <FiMail className='mt-3' size={30} />
          <input className='bg-color2  m-3' type="email" placeholder="Email" />
          </label>
          <label className='text-color1 flex flex row border-b-2 border-color1 '>
            <IoFingerPrintOutline className='mt-3' size={30} />
          <input className='bg-color2  m-3' type="password" placeholder="Password" />
          </label>
          <button className='border-2 border-white px-2 text-white m-10  px-4 py-1
          hover:px-8 hover:bg-color1 hover:border-color2 hover:text-color2 hover:font-bold duration-300'>
            Sign in</button>
            <p/>
          {err &&
           <div className="bg-red-100 border mb-4 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
           <strong className="font-bold">Holy smokes!</strong>
           <span className="block sm:inline"> Unavaliable Account!</span>
           <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
  
           </span>
         </div>
           }
        </form>
        <p className='text-white hover:text-color1 duration-300 cursor-pointer'><Link to="/register">You don't have an account? Register</Link></p>
      </div>
    </div>
                
        </motion.div>
  )
}

export default Login