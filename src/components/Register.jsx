import React, { useState } from "react";
import {ImUser} from "react-icons/im";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import {IoFingerPrintOutline,IoImageOutline } from "react-icons/io5";
import { FiMail,FiPhone } from "react-icons/fi";
import { animateY } from '../utils/motion';
import { motion } from 'framer-motion';
import Add from "../assets/addAvatar.png"

const Register = () => {
  const [comp, setComp] = useState(false);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            setComp(true);
           
            
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
      alert(err)
    }
   
  };

  return (
    <motion.div
    animate={animateY()}
    className="items-center">
      <div className="flex flex-col items-center sm: mt-[150px]">
            <h1 className="text-color1 mb-8 text-5xl">Sing Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <label className="text-color1 flex flex row border-b-2 border-color1 ">
            <ImUser size={30} className="mt-1.5"/>
          <input className="bg-color2 m-3" required type="text" placeholder="Display name.." />
          </label>
          <label className="text-color1 flex flex row border-b-2 border-color1 " >
            <FiMail size={30} className="mt-3" />
          <input className="bg-color2  m-3" required type="email" placeholder="Email.." />
          </label>
          <label className="text-color1 flex flex row border-b-2 border-color1 ">
            <IoFingerPrintOutline size={30} className="mt-2.5" />
          <input className="bg-color2  m-3" required type="password" placeholder="Password" />
          </label>
          <input className="bg-color2 border-2 border-color1 m-3" required style={{ display: "none" }} type="file" id="file" />
          <label className="flex flex row text-color1 mt-5 border-b-2 border-color1" htmlFor="file">
            <IoImageOutline size={30} className="mr-5" />
            <span className="text-color1 mt-2">Add an avatar +</span>
          </label>
          <button disabled={loading}
          className="border-2 p-[5px] px-4  text-[white] mt-5 hover:px-8 hover:bg-color1 hover:border-color2 hover:text-color2 hover:font-bold duration-300" 
          >Sign up</button>
          {loading && <span className="text-color1">Uploading and compressing the image please wait...</span>}
          {comp && 
                <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-2 py-2 mt-3 shadow-md" role="alert">
                <p className="font-bold">Your account has been successfully created!</p>
                <button className="font-bold hover:text-color1 duration-300 text-center"> 
                  <Link to="/login">Login Now!</Link>
                  </button>
                </div>}
          {err && <span className="text-color1">Something went wrong</span>}
        </form>
        <p className="text-white hover:text-color1 duration-300 mt-4">
           <Link to="/login">You do have an account? Login</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Register;