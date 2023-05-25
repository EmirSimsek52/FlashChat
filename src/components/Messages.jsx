import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";
function Messages() {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);
  
    useEffect(() => {
      const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
  
      return () => {
        unSub();
      };
    }, [data.chatId]);
  
    console.log(messages)
  return (
    <div className=" h-[500px] overflow-y-scroll scrollbar-thick scrollbar-thumb-blue-500 scrollbar-track-blue-100">
        {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}

    </div>
  )
}

export default Messages