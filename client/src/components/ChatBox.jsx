import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import Message from "./Message";

function ChatBox() {

  const { selectedChat, theme } = useAppContext();

  const [messages, setMessages] = useState([])
  const [loading, setloading] = useState(false)

  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("text");
  const [isPublished, setIsPublished] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
  }

  useEffect(()=>{
    if(selectedChat){
      setMessages(selectedChat.messages)
    }
  },[selectedChat])

  return (<div className="flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40" >

    {/* Chat Messages */}
    <div className="flex-1 mb-5 overflow-y-scroll" >
      {messages.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center gap-2 text-primary" >
          <img src={theme === "dark" ? assets.logo_full : assets.logo_full_dark} alt="QuickGPT" className="w-full max-w-56 sm:max-68" />
          <p className="mt-5 text-4xl sm:text-6xl text-center text-gray-400">Ask Me Anything.</p>
        </div>
      )}

      {messages.map((message, index)=> <Message key={index} message={message}/>)}

      {/* Loading Animations */}
      {loading && (<div className="loader flex items-center gap-1.5" >
        <div className="w-1.5 h-1 rounded-full bg-gray-500 dark:bg-white animate-bounce" ></div>
        <div className="w-1.5 h-1 rounded-full bg-gray-500 dark:bg-white animate-bounce" ></div>
        <div className="w-1.5 h-1 rounded-full bg-gray-500 dark:bg-white animate-bounce" ></div>
        </div>)}
    </div>

    {/* Prompt Input Field */}
    <form className="bg-primary/20 dark:bg-[#583C79]/30 border border-primary dark:border-[#80609F]/30 rounded-full w-full max-w-2xl p-3 pl-4 mx-auto flex gap-4 items-center" onSubmit={onSubmit}>
      <select onChange={(e)=>setMode(e.target.value)} value={mode} className="text-sm pl-3 pr-2 outline-none" >
        <option className="dark:bg-purple-900" value="text">Text</option>
        <option className="dark:bg-purple-900" value="image">Image</option>
      </select>
      <input type="text" value={prompt} placeholder="Type Your Prompt Here..." className="flex-1 w-full text-sm outline-none" required onChange={(e)=>setPrompt(e.target.value)} />
      <button disabled={loading} type="submit">
        <img src={loading ? assets.stop_icon : assets.send_icon}/>
      </button>
    </form>

    {mode==="image" && (
      <label className="flex justify-center items-center gap-2 pt-3 text-sm max-auto ">
        <p className="text-xs">Publish Generated Image to Community</p>
        <input type="checkbox" className="cursor-pointer" checked={isPublished} onChange={(e)=>setIsPublished(e.target.checked)} />
      </label>
    )}

  </div>)
}

export default ChatBox;
