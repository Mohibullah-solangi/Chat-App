const socket = io("127.0.0.1:4000");
var Users = [];
var LoginUser = JSON.parse(window.localStorage.getItem("User"));

// To leave a chat
export function leaveChat(){
    console.log("Leave Chat");
    if(LoginUser){
        let Editinfo = {id: LoginUser.id, joined: false};
        socket.emit("LeaveChat", Editinfo)
    }
    else{
    
        // let div = document.createElement('div');
        // div.innerHTML = "Please Login";
        // div.classList.add("alert", "alert-warning");
        // div.setAttribute("role", alert);
    
        alert("Kindly Login")
    }
    
    }