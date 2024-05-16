const socket = io("127.0.0.1:4000");
var Users = [];
var LoginUser = JSON.parse(window.localStorage.getItem("User"));

export function addUser(e){
    e.preventDefault();

   console.log("Adding User", socket);
    function validateForm() {
        // Custom validation logic
        let Name = document.getElementById("name").value.trim();
        
        let Email = document.getElementById("email").value.trim();
        if (!Name || !Email) {
            // Required fields are empty
            return false;
        }
    
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Email)) {
            // Invalid email format
            return false;
        }
    
        return true; // Form is valid
    }
   let Name = document.getElementById("name").value;
   console.log(Name, "Name")
   var firstName = Name.split(" ")[0];
   var lastName = Name.split(" ")[1];
   let Email = document.getElementById("email").value;
   validateForm();

   if (validateForm()) {
    // Form is valid, proceed with form submission
    let User = {firstName: firstName,lastName: lastName , email: Email};
    socket.emit("user", User);
    document.getElementById('message').removeAttribute('disabled');
    document.getElementById('Send').removeAttribute('disabled');
    document.querySelector(".chat-join").reset();
    socket.emit('Chat', User);
    console.log('Form submitted successfully');
} else {
    // Form is invalid, do something (e.g., display error messages)
    console.log('Form validation failed');
}
   
}