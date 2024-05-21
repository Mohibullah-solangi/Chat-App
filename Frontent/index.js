import {addUser} from "./js/addUser.js";
import { addMessage } from "./js/addMessage.js";
import { leaveChat } from "./js/leaveChat.js";
import { messageClick } from "./js/messageClicked.js";
import { deleteMessage } from "./socketFunctions/deleteMessage.js";
import {updatedUser} from "./socketFunctions/updateUser.js";
import { createLocation } from "./js/createLocation.js";
import { checkMessageField } from "./js/checkMessageField.js";


// Initialization
const socket = io("http://127.0.0.1:4000");
var LoginUser = JSON.parse(window.localStorage.getItem("User"));

// Already Exist User
if(LoginUser){
    document.addEventListener('DOMContentLoaded', function() {
      
        document.getElementById('message').removeAttribute('disabled');
        document.getElementById('Send').removeAttribute('disabled');
    });
    
    
}

// Initial Connection build
socket.on("connection", (res)=>{
    // console.log(res);

});


// On Socket Sucessful Connection
socket.on("welcome", (mess)=>{
    console.log(mess);
    let ul = document.querySelector(".chat-display");
    let li = document.createElement("li");
   
    li.classList.add("col-lg-2","text-center","mx-auto", "rounded-pill","bg-dark-subtle", "mb-2", "px-1","text-white" );
   
    li.innerHTML = mess;
    ul.appendChild(li);
})

// Receiving Users Socket
socket.on("users", (users)=>{
   let user_para =  document.getElementById("online-users");
   while (user_para.hasChildNodes()) {
    user_para.removeChild(user_para.firstChild);
  }
    window.Users = users;
   console.log(users, "Users data")


//  Mapping Users for Display
   users.map((User)=>{
    let span = document.createElement("span");
    span.classList.add("bg-success","me-3", "mt-5", "p-3","rounded-pill","text-white");

    
     span.innerHTML =  User.firstName.charAt(0).toUpperCase() + User.firstName.slice(1);;
     user_para.appendChild(span);

   
   })
//    console.log(user_para)
})


// Receiving Live Messages 
socket.on("message", (users)=>{
    let dateMap = new Map();


    let ul =  document.querySelector(".chat-display");

    while (ul.hasChildNodes() && ul.childNodes.length >= 1) {
        ul.removeChild(ul.firstChild);
      }
      
   console.log(users);
//    Mapping Messages for Display
users.map((Msg)=>{


console.log(Msg.user_message);
let user_Messages = Msg.user_message;
user_Messages.map((message)=>{

    const timestamp = message.messageTime;
    const dateObject = new Date(timestamp);
    const month   = dateObject.getUTCMonth() + 1; // months from 1-12
    const day     = dateObject.getUTCDate();
    const year    = dateObject.getUTCFullYear();
 



//    Seperating messages based on dates
if(dateMap.size > 0){
    let date = dateMap.has(`${month}/${day}/${year}`);
    if(date){
        console.log("date already present");
        let message_date = dateMap.get(`${month}/${day}/${year}`)
        console.log(message_date, "Message Date");
        message_date.push(message);
        dateMap.set(`${month}/${day}/${year}`, message_date);
    }
    else{
        console.log("Not Present");
        dateMap.set(`${month}/${day}/${year}`, [message])
    }
}
else{
    dateMap.set(`${month}/${day}/${year}`, [message]);
    console.log(dateMap, "New date Map Created")
}


})

   });

//  Mapping message based on dates
   const iterators = dateMap.keys();

console.log(iterators);;
for (let index = 0; index < dateMap.size; index++) {
    const date = iterators.next().value;
    let currentTime = new Date();
    const current_month   = currentTime.getUTCMonth() + 1; // months from 1-12
    const current_day     = currentTime.getUTCDate();
    const current_year    = currentTime.getUTCFullYear();
    let current_date = `${current_month}/${current_day}/${current_year}`
    console.log(date)
    let messages = dateMap.get(date);
                if(date == current_date){
                    let li = document.createElement("li");
            
                    li.classList.add("col-lg-2","text-center","mx-auto", "rounded-pill","bg-dark-subtle", "mb-2", "px-1","text-white" );
                
                    li.innerHTML = "Today";
                    ul.appendChild(li);
                }
                else {
                    let li = document.createElement("li");
            
                    li.classList.add("col-lg-2","text-center","mx-auto", "rounded-pill","bg-dark-subtle", "mb-2", "px-1","text-white" );
                
                    li.innerHTML = date;
                    ul.appendChild(li);
                }
                messages.map((message)=>{
                    let li = document.createElement("li");
                    li.classList.add("list-group-item", "me-3","mt-2", "border", "rounded-4", "bg-light-subtle");
                    li.style.width = "fit-content";
                   if(message.message.includes("https://www.google.com/maps")){
                    li.innerHTML =  document.getElementById(
                        "location-card"
                      ).innerHTML
                   }
                   else{
                    li.innerHTML =  message.message;
                   }
                     
                
                     console.log(message.messageBy, "Iniial Messages Loading")
                    //  Adding Message Name 
                     let p1 = document.createElement("p");
                           p1.innerHTML = message.messageBy;
                           if(message.messageBy.toLowerCase() == LoginUser.firstName.toLowerCase()){
                            li.classList.add("list-group-item", "me-3","mt-2", "border", "rounded-4", "bg-light-subtle", "align-self-end");
                           }
                           p1.classList.add("col-lg-1","rounded-circle", "text-danger","mb-2");
                   
                           li.prepend(p1);


    //  Adding Message Time to the Messages
    let p2 = document.createElement("p");
    const timestamp = message.messageTime;
    const dateObject = new Date(timestamp);


     // Convert the date to a formatted time string
     const formattedTime = dateObject.toLocaleTimeString([], { hour12: true });
     //  let Time = Msg.time.toLocaleTimeString();
     
      p2.innerHTML = formattedTime;
      p2.classList.add("text-end", "ms-3", "pt-2", "text-body-secondary");
      p2.style.fontSize ="9px"
      li.appendChild(p2);
      li.setAttribute("data-id", message.id)
      ul.appendChild(li);
                }) 
}

})

// User Joined the Chat
socket.on("roomJoined",(msg)=>{
   let ul= document.querySelector(".chat-display");
   let li = document.createElement("li");
   
   li.classList.add("col-lg-2","text-center","mx-auto", "rounded-pill","bg-dark-subtle", "mb-2", "px-1","text-white" );
  
   li.innerHTML = msg;
   ul.appendChild(li);
        })






//  User Leave the Chat
socket.on('LeaveChat', updatedUser);


// User Message deleted
socket.on('deleteMessage', deleteMessage);

document.querySelector('.chat-join').addEventListener('submit', function(event) {
   
    // Calling addUser function import from js folder
    addUser(event); 
});

document.querySelector('.chat-message').addEventListener('submit', function(event) {
   
    // Calling addMessage function import from js folder
    addMessage(event, LoginUser); 
});


document.querySelector('.chat-display').addEventListener('click', function(event) {
   
    // Calling messageClick function import from js folder
    messageClick(event); 
});


document.querySelector('#leaveChat').addEventListener('click', function() {
   
    // Calling leaveChat function import from js folder
    leaveChat(); 
});

document.querySelector('.fa-location-dot').addEventListener('click', function() {
   
    // Calling leaveChat function import from js folder
    createLocation(); 
});


document.querySelector('#message').addEventListener('keyup', function(event) {
   
    // Calling leaveChat function import from js folder
    checkMessageField(event); 
});
  
document.getElementById("options-header")
