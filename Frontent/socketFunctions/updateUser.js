var LoginUser = JSON.parse(window.localStorage.getItem("User"));

export const updatedUser = (updatedUser)=>{
    // console.log(updatedUser)
    if(updatedUser){
        // console.log(LoginUser)
        LoginUser.firstName
        let ul = document.querySelector(".chat-display");
        let li = document.createElement("li");
       
        li.classList.add("col-lg-2","text-center","mx-auto", "rounded-pill","bg-dark-subtle", "mb-2", "px-1","text-white" );
       
        li.innerHTML = `${ LoginUser.firstName} leave the chat`;
        ul.appendChild(li);
        window.localStorage.removeItem("User");
        LoginUser = null;
        document.getElementById('message').setAttribute('disabled', true);
        document.getElementById('Send').setAttribute('disabled', true);
    }
}