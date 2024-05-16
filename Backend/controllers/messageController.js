// const { where } = require('sequelize');
const db = require('../models');


// Models
const Message = db.messages;


// Functions
// Create New Users
const addMessage = async (req, res)=>{

    let info = {
        message: req.message,
        messageBy: req.messageBy,
        messageTime: new Date(),
        socketID: req.socketID,
        user_id: req.id
      
    }

    const message = await Message.create(info);
   return message;
}


//  Get All Users
const getAllMessages = async (req, res)=>{

     const messages = await Message.findAll({
        // attributes: [
        //     'firstName',
        //     'lastName',
        //     'email'
        // ]
     });
    
     return messages;
}



// Get Single Users
const getOneMessage = async (req, res)=>{
    let id = req.params.id;
    const message = await Message.findOne({
      where: {id: id}
    });
    console.log(message);
    return message;
}

// Updating User
const UpdateMessage = async (req, res)=>{
    let id = req.params.id;
    const message = await Message.update(req, {
      where: {id: id}
    });
    console.log(message);
    return message;
}

// Delete User
const DeleteMessage = async (req, res)=>{
    let id = req;
   const deletedMessage = await Message.destroy( {
      where: {id: id}
    });
    console.log("User deleted");
    return deletedMessage;
}
   
 

module.exports = {
    
    addMessage,
    getAllMessages,
    getOneMessage,
    UpdateMessage,
    DeleteMessage
}