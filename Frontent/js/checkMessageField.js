export function checkMessageField(e) {

if(!e.target.value){
    let location_card = document.getElementById("location-card");
    location_card.classList.add("d-none");
    location_card.classList.remove("d-block");


}

}