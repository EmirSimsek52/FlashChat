import React,{ useContext, useEffect, useState } from 'react'
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";

function Chats() {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  
  return (
    <div className='felx felx-col text-color1 overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100 rtl'>
      <h1 className='text-center border-b-2 border-color1 mt-2'>Chats</h1>
    <div>
    {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="flex flex-row  hover:opacity-50 duration-300 cursor-pointer  bg-opacity-80 bg-color2 border-b-2 border-color2
          ml-1  max-  w-[235px]"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} className='w-14 h-14  mt-3 rounded-lg' />
            <div className="mt-3 ml-3 ">
            <span>{chat[1].userInfo.displayName}</span>
            <p className="opacity-60 text-s">{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Chats