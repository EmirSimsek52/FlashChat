import React,{useContext, useState} from 'react';
import { db } from "../firebase";
import {IoFingerPrintOutline,IoSendSharp,IoPersonAdd } from "react-icons/io5";
import {
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
    updateDoc,
    serverTimestamp,
    getDoc,
  } from "firebase/firestore";
import { AuthContext } from '../context/AuthContext';
import Chats from './Chats';
function Search() {
    const {currentUser} = useContext(AuthContext)
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    
    const handleSearch = async () => {
        const qy = query(
          collection(db, "users"),
          where("displayName", "==", username)
        );
    
        try {
          const querySnapshot = await getDocs(qy);
          querySnapshot.forEach((doc) => {
            setUser(doc.data());
          });
        } catch (err) {
            setErr(true)

        }
      };
    
      const handleKey = (e) => {
        handleSearch();
      };
      const handleSelect = async () => {
        //check whether the group(chats in firestore) exists, if not create
        const combinedId =
          currentUser.uid > user.uid
            ? currentUser.uid + user.uid
            : user.uid + currentUser.uid;
        try {
          const res = await getDoc(doc(db, "chats", combinedId));
    
          if (!res.exists()) {
            //create a chat in chats collection
            await setDoc(doc(db, "chats", combinedId), { messages: [] });
    
            //create user chats
            await updateDoc(doc(db, "userChats", currentUser.uid), {
              [combinedId + ".userInfo"]: {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
              },
              [combinedId + ".date"]: serverTimestamp(),
            });
    
            await updateDoc(doc(db, "userChats", user.uid), {
              [combinedId + ".userInfo"]: {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
              },
              [combinedId + ".date"]: serverTimestamp(),
            });
          }
        } catch (err) {
         
        }
    
        setUser(null);
        setUsername("")
      };

  return (
    <div className=' border-[#394867] bg-color2 rounded-xl flex flex-col items-center m-4 '>
    <div className='flex flex-col self-center mb-[-10px] mt-3 text-center'>
      <img className='w-12 h-12 mb-[-20px] rounded-lg ' src={currentUser.photoURL} /> 
      <span className='mt-6'>{currentUser.displayName}</span>
    </div>
    <div className='flex flex-row'>
<input type='text' placeholder='Search anyone?' 
  className='bg-color3 border-2 rounded-lg sm:px-3 px-2 sm:py-0  py-0 sm:w-[180px] w-[120px] m-4'
  onChange={e=>setUsername(e.target.value)}
 
  />
  <button>
  <IoSendSharp size={30} className='mr-3 text-color1 hover:opacity-50 duration-300 ' onClick={handleKey} />
  </button>
  </div>
    {err && <span>User not found!</span>}
    {user && 
     <div className='flex flex-row border-b-2 border-color1 sm:ml-2 ml-0 sm:w-[210px] w-[150px]  cursor-pointer items-center ' >
           <img src={user.photoURL} className='w-12 h-12 rounded-lg' />
           <span className=' mt-5 sm:ml-3 ml-0'>{user.displayName}</span>
          <IoPersonAdd size={30} className='text-color1 hover:opacity-40 duration-300 sm:ml-16 ml-5' onClick={handleSelect} />
           </div>
    }
  <Chats/>
</div>

  )
}

export default Search