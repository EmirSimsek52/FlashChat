import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
  
    const ref = useRef();
  
    useEffect(() => {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);
  return (
    <div
    ref={ref}
    className={`message ${message.senderId === currentUser.uid && "owner"}`}
  >
    <div 
     className={`${message.senderId === currentUser.uid ? " flex justify-end  ": "  " }`}
    >
        {message.senderId === currentUser.uid ?
            <div className=" sm:max-w-[50%] max-w-[70%] mt-3 " >
                <div className='max-w-[100%]  mt-3 flex flex-row justify-end '>
                 <p
                className="bg-color2 bg-opacity-50 p-2 max-w-lg rounded-xl text-center"
                >{message.text}</p>
                        <img
                src={
                    message.senderId === currentUser.uid
                    ? currentUser.photoURL
                    : data.user.photoURL
                }
                alt=""
                className="w-10 h-10 rounded-md "
                />
                </div>
                <div className="max-w-[30%] flex justify-items-end">
                {message.img && 
                <img src={message.img} alt=""
                    className="flex self-end"
                />}
            </div>
            
            </div>
          :
            <div className=" max-w-[80%] mt-3 ">
              <div className="flex flex-row">
                <img
                src={
                message.senderId === data.uid
                    ? currentUser.photoURL
                    : data.user.photoURL
                }
                alt=""
                className="w-10 h-10 rounded-sm m-2 "
            />
             <p
            className="bg-color2 bg-opacity-50 p-2 max-w-lg rounded-xl  flex justify-end text-center"
            >{message.text}</p>
            </div>
            <div className="max-w-[60%]">
  
            {message.img && 
            <img src={message.img} alt=""
                className="ml-4"
            />}
            </div>
        </div>
         }
   
      
    </div>
    <span className="opacity-80 text-color1"></span>
  </div>
  )
}

export default Message