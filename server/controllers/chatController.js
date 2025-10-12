import Chat from "../models/Chat";

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

        await Chat.deleteOne({_id: chatId, userId})
        
        res.json({success: true, message: "Chat Deleted"})

    } catch(error) {
        res.json({success: true, message: error.mesaage})
    }
}