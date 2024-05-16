// const { where } = require('sequelize');
const db = require('../models');


// Model
const User = db.users;
const Message = db.messages;



// Functions
// Create New Users
const addUser = async (req, res)=>{

    let info = {
        firstName: req.firstName,
        lastName: req.lastName,
        email: req.email,
        socketID: req.socketID,
        joinTime: new Date(),
        joined: req.joined ? req.joined : true
    }
    const AlreadyExist = await User.findOne({
        where: {email: req.email}});
    console.log(AlreadyExist, "AlreadyExisted")
    if(AlreadyExist){
        return AlreadyExist;
    }else{
        const user = await User.create(info);
        return user;
    }
   
}


//  Get All Users
const getAllUsers = async (req, res)=>{

     const users = await User.findAll({
        // attributes: [
        //     'firstName',
        //     'lastName',
        //     'email'
        // ]
     });
    
     return users;
}


//  Get All Users
const getActiveUsers = async (req, res)=>{
console.log("get User")
    const users = await User.findAll({
      where: {joined: true}
    });

    return users;
   
}

const getAllMessagesByUser = async (req, res)=>{

    const users = await User.findAll({
     include:[
        {
            model: Message,
            as: 'user_message'
        }
     ]
    });

    return users;
   
}

// Get Single Users
const getOneUser = async (req, res)=>{
    let id = req.params.id;
    const user = await User.findOne({
      where: {id: id}
    });
    console.log(user);
    return user;
}

// Updating User
const UpdateUser = async (req, res)=>{
    let id = req.id;
   delete req.id;
    const user = await User.update(req, {
      where: {id: id}
    });
    console.log(user);
    return user;
}

// Delete User
const DeleteUser = async (req, res)=>{
    let id = req.id;
    delete req.id;
    const user = await User.destroy( {
      where: {id: id}
    });
    console.log("User deleted");
    return user;
}

module.exports = {
    getAllUsers,
    getActiveUsers,
    getOneUser,
    addUser,
    UpdateUser,
    DeleteUser,
    getAllMessagesByUser
}