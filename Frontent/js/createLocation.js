export function createLocation() {
  console.log("clicked", navigator.geolocation);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    document.getElementById("demo").innerHTML =
      "Geolocation is not supported by this browser.";
  }
}

async function showPosition(position) {
  // console.log(position, "POsition");
  document.getElementById("demo").innerHTML =
    "Latitude: " +
    position.coords.latitude + 
    "Longitude: " +
    position.coords.longitude;
 
  document.getElementById(
    "iframe-cords"
  ).src = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}&hl=en&z=14&output=embed`;

  // document.getElementById(
  //   "map"
  // ).href = `http://maps.google.com?q=${position.coords.latitude},${position.coords.longitude}`;
  let location = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
  );
  let data = await location.json();
  console.log(data);
  document.getElementById("message").value = data.display_name;
  // location-card
  let location_card = document.getElementById("location-card");
  location_card.classList.add("d-block");
  location_card.classList.remove("d-none");
}
