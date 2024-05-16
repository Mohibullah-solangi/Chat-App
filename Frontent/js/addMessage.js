const socket = io("127.0.0.1:4000");
var Users = [];
var LoginUser = JSON.parse(window.localStorage.getItem("User"));

export function addMessage(e){
    e.preventDefault();
    
   let Message = document.getElementById("message").value;
   console.log(LoginUser, "message");

//  Sending User Name with Message
    let MessageBy = LoginUser.firstName;
    let id = LoginUser.id
    let Msg ={Message, MessageBy, id: id}
   console.log(Msg);
   socket.emit("message", Msg);
   document.querySelector(".chat-message").reset();
}