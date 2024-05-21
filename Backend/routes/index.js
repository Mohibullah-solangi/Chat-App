
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');


// socket.emit('message', "this is a test"); //sending to sender-client only

// socket.broadcast.emit('message', "this is a test"); //sending to all clients except sender

// socket.broadcast.to('game').emit('message', 'nice game'); //sending to all clients in 'game' room(channel) except sender

// socket.to('game').emit('message', 'enjoy the game'); //sending to sender client, only if they are in 'game' room(channel)

// socket.broadcast.to(socketid).emit('message', 'for your eyes only'); //sending to individual socketid

// io.emit('message', "this is a test"); //sending to all clients, include sender

// io.in('game').emit('message', 'cool game'); //sending to all clients in 'game' room(channel), include sender

// io.of('myNamespace').emit('message', 'gg'); //sending to all clients in namespace 'myNamespace', include sender

// socket.emit(); //send to all connected clients

// socket.broadcast.emit(); //send to all connected clients except the one that sent the message

// socket.on(); //event listener, can be called on client to execute on server

// io.sockets.socket(); //for emiting to specific clients

// io.sockets.emit(); //send to all connected clients (same as socket.emit)

// io.sockets.on() ; //initial connection from a client.



// Initializing socket server
const io = new Server(server,
    {
        cors: {
          origin: "http://127.0.0.1:5500",
          methods: ["GET", "POST"]
        }
      }
);


// Establishing Connection with Frontend
io.on('connection', async (socket) => {
    
    // Successly connected 
    console.log('a user connected');

    // Getting All Active Users From DB
    const users = await userController.getActiveUsers(socket);
   
    // Sending Active Users to Frontend
    socket.emit('users', users );
    socket.emit('welcome', "Welcome to the chat");
    let Allmessages = await userController.getAllMessagesByUser();
    console.log(Allmessages)
    socket.emit('message', Allmessages);
   

    // Listening to Frontend for New User Addition
    socket.on('user', async (user)=>{
    
        let User = {...user, socketID: socket.id}
        let createdUser = await userController.addUser(User);
        console.log(createdUser, "User Created")
        console.log(socket.id);
        io.to(socket.id).emit('newUser', createdUser);
        const users = await userController.getActiveUsers(socket);

        // Returning Updated User listing to All connected Users
        io.sockets.emit('users', users );
    });


    // Notifing All connected User a messsage about newly Joined User
    socket.on("Chat", (Chat)=>{
        socket.join(Chat);
        socket.emit('roomJoined', `${Chat.firstName} joined the chat`);

        
    });
   

    // Listening to Frontend for New Messages Addition
    socket.on('message', async(Msg)=>{
      let Message = {socketID: socket.id, message:Msg.Message, messageBy:Msg.MessageBy, id: Msg.id};
      await messageController.addMessage(Message);
      let Allmessages = await userController.getAllMessagesByUser();
      console.log(Allmessages)
    //  Sending new message to All Users in Chat
      io.sockets.emit('message', Allmessages)
    });

    // Leave Chat
    socket.on('LeaveChat', async(userinfo)=>{
       let LeavedUser = await userController.DeleteUser(userinfo);
       socket.emit('LeaveChat', LeavedUser);

    //    Updated Messages and user list
    let Allmessages = await userController.getAllMessagesByUser();
    console.log(Allmessages)
    io.sockets.emit('message', Allmessages);

    const users = await userController.getActiveUsers(socket);
   
    // Sending Active Users to Frontend
    io.sockets.emit('users', users );
    });


    // Delete User Message
    socket.on('deleteMessage', async(id)=>{
       const Messagedeleted = await messageController.DeleteMessage(id);
       io.sockets.emit('deleteMessage', {Messagedeleted, id});
    })

  });



module.exports = io