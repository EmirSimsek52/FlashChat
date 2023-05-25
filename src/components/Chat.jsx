import React,{useContext} from 'react'
import { ChatContext } from "../context/ChatContext";
import InputText from './InputText';
import Messages from './Messages';

function Chat() {
    const { data } = useContext(ChatContext);
  return (
    <div className='felx felx-col text-color1'>
    <div className='bg-[#394867] sm:m-4 m-1  h sm:w-[880px] w-[full] h-[550px] rounded-lg'>
        <div className='bg-color2 p-3 rounded-t-lg h-12'>
            <span>{data.user?.displayName}</span> 
        </div>
        <div>
       <Messages/>
       </div>
    </div>
  </div>
  )
}

export default Chat