import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import moment from "moment";

function Sidebar({isMenuOpen, setIsMenuOpen}) {

  const {chats, selectedChats, theme, setTheme, user, navigate} = useAppContext()
  const [search, setSearch] = useState('')
  
  
  return (
    <div className={`flex flex-col h-screen w-72 p-5 dark:bg-gradient-to-b from-[#242124]/30 to-[#000000]/30 border-r border-[#80609F]/30 backdrop-blur-3xl transition-all duration-500 max-mid:absolute left-0 z-1 ${!isMenuOpen && "max-md:-translate-x-full"}`}>

      {/* Logo */}
      <img src={theme==='dark'?assets.logo_full : assets.logo_full_dark} alt="QuickGPT" className="w-full max-w-48" />

      {/* New Chat Button */}
      <button className="flex justify-center items-center w-full py-2 mt-10 text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-sm rounded-md cursor-pointer">
        <span className="mr-2 text-xl">+</span> 
        New Chat
      </button>

      {/* Search Conversations */}
      <div className="flex items-center gap-2 p-3 mt-4 border border-gray-400 dark:border-white/20 rounded-md">
        <img src={assets.search_icon} alt="Search Icon" className="w-4 not-dark:invert" />
        <input type="text" placeholder="Search Conversations" className="text-xs placeholder:text-gray-400 outline-none" onChange={(e)=>setSearch(e.target.value)} value={search} />
      </div>

      {/* Recent Chats */}
      {chats.length>0 && <p className="mt-4 text-sm" >Recent Chats</p>}
      <div className="flex-1 overflow-y-scroll mt-3 text-sm space-y-3" >
        {
          chats.filter((chat)=> chat.messages[0] ? chat.messages[0]?.content.toLowerCase().trim().includes(search.toLowerCase().trim()) : chat.name.toLowerCase().trim().includes(search.toLowerCase().trim())).map((chat)=>(
            <div key={chat._id} className="p-2 px-4 dark:bg-[#57317C]/10 border border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer flex justify-between group">
              <div>
                <p className="truncate w-full" >
                  {chat.messages.length>0?chat.messages[0].content.slice(0,32) : chat.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-[#B1A6C0]" >{moment(chat.updatedAt).fromNow
                  ()}</p>
              </div>
              <img src={assets.bin_icon} className="hidden group-hover:block w-4 cursor-pointer not-dark:invert" />
            </div>
          ))
        }
      </div>

      {/* Community Images */}
      <div className="flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all" onClick={()=>{navigate("/community")}} >
        <img src={assets.gallery_icon} className="w-4.5 not-dark:invert" />
        <div className="flex flex-col text-sm" >
          <p>Community Images</p>
        </div>
      </div>

      {/* Credit Purrchase Option */}
      <div className="flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all" onClick={()=>{navigate("/credits")}} >
        <img src={assets.diamond_icon} className="w-4.5 dark:invert" />
        <div className="flex flex-col text-sm" >
          <p>Credits : {user?.credits}</p>
          <p className="text-xs text-gray-400" >Purchase Credits to use QuickGPT</p>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="flex items-center justify-between gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md" >
        <div className="flex items-center gap-2 text-sm" >
          <img src={assets.theme_icon} className="w-4 not-dark:invert" />
          <p>Dark Mode</p>
        </div>
        <label className="relative inline-flex cursor-pointer" >
          <input type="checkbox" className="sr-only peer" checked={theme==="dark"} onChange={()=> setTheme(theme==="dark"?"light":"dark")} />
          <div className="w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all" ></div>
          <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4" ></span>
        </label>
      </div>

      {/* User Account */}
      <div className="flex items-center gap-3 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer group" >
        <img src={assets.user_icon} className="w-7 rounded-full" />
        <p className="flex-1 text-sm dark:text-primary truncate" >{user?user.name:"Login Your Account"}</p>
        {user&&<img src={assets.logout_icon} className="h-5 cursor-pointer hidden not-dark:invert group-hover:block" />}
      </div>

      <img src={assets.close_icon} className="absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden not-dark:invert" onClick={()=>setIsMenuOpen(false)} />

    </div>
  )
}

export default Sidebar;
