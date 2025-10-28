import Chat from "../models/Chat.js";

// API for Creating a new Chat
export const createChat = async(req, res) => {
    try {
        const userId = req.user._id

        const chatData = {
            userId,
            messages:[],
            name:"New Chat",
            userName: req.user.name
        }

        await Chat.create(chatData)
        res.json({success: true, message: "Chat Created"})

    } catch(error) {
        res.json({success: true, message: error.mesaage})
    }
}

// API for Getting All Chats
export const getChats = async(req, res) => {
    try {
        const userId = req.user._id

        const chats = await Chat.find({userId}).sort({updatedAt: -1})
        
        res.json({success: true, chats})

    } catch(error) {
        res.json({success: true, message: error.mesaage})
    }
}

// API for Deleting selected Chats
export const deleteChat = async(req, res) => {
    try {

        const userId = req.user._id
        const {chatId} = req.body
        const chat = await Chat.findOne({_id: chatId, userId});
        if(chat){
            await Chat.deleteOne({_id: chatId, userId});
            return res.json({success: true, message: "Chat Deleted"})
        }
        return res.status(404).json({success: false, message: "Chat Not Found"});

    } catch(error) {
        res.status(404).json({success: false, message: error.message})
    }
}