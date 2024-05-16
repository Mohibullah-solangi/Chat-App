

export const deleteMessage = (res)=>{
    console.log(res)
    if(res.Messagedeleted){
        console.log(res.Messagedeleted, "Message has been deleted");

       const messageDiv = document.querySelector(`[data-id='${res.id}']`);
    //    console.log(messageDiv);
     messageDiv.innerHTML = "Message has been deleted";

    }
    else{
        console.log("Message deleted failed");
    }
}