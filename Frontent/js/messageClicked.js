const socket = io("127.0.0.1:4000");
var Users = [];
var LoginUser = JSON.parse(window.localStorage.getItem("User"));

// Message delete or update function
export function messageClick(e){
    // console.log(e.target.dataset['id'], "Message Click")
    socket.emit("deleteMessage", e.target.dataset['id']);
    }