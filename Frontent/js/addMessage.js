const socket = io("http://127.0.0.1:4000");


export function addMessage(e, LoginUser){
    e.preventDefault();
    
   let Message = document.getElementById("message").value;
   console.log(LoginUser, "message");
   let location_card = document.getElementById("location-card");
   let location_hidden = location_card.classList.contains("d-none");
   if(location_hidden){

    //  Sending User Name with Message
    let MessageBy = LoginUser.firstName;
    let id = LoginUser.id
    let Msg ={Message, MessageBy, id: id}
   console.log(Msg);
   socket.emit("message", Msg);
   document.querySelector(".chat-message").reset();
   }
   else{
   let cord_message = document.getElementById(
    "iframe-cords"
  ).src 
    //  Sending User Name with Message
    let MessageBy = LoginUser.firstName;
    let id = LoginUser.id
    let Msg ={Message: cord_message, MessageBy, id: id}
   console.log(Msg);
   socket.emit("message", Msg);
   document.querySelector(".chat-message").reset();
   }


}