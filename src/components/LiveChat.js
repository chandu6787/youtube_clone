import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateName, generateDynamicSentence } from "../utils/helper";
const LiveChat = () => {
  const dispatch = useDispatch();
  const chatMessages = useSelector((store) => store.chat.messages);
  const [liveMessage,setLiveMessage]=useState(null);
  const handleClick=()=>
  {
    dispatch(addMessage({
        name:"currentUser",
        message:liveMessage
    }))
  }
  useEffect(() => {
    const id = setInterval(() => {
      dispatch(
        addMessage({
          name: generateName(),
          message: generateDynamicSentence(),
        }),
      );
    }, 2000);
    return () => clearInterval(id);
  }, []);
  return (
    <>
    <div className="h-[350px] lg:h-[560px] ml-2 p-2 border border-black bg-slate-100 rounded-lg m-1 overflow-y-scroll flex flex-col-reverse">
      {chatMessages.map((c, i) => (
        <ChatMessage name={c.name} message={c.message} key={i} />
      ))}
    </div>
    <div className="w-full p-2 border border-gray-200 rounded-lg">
        <input className="w-3/4 px-4 py-2 border border-gray-300 rounded-lg " type="text" value={liveMessage} onChange={(e)=>setLiveMessage(e.target.value)}/>
        <button className="px-4 mx-2 py-2 bg-green-500 rounded-lg" onClick={handleClick}>Send</button>
        </div>
    </>
  );
};

export default LiveChat;
