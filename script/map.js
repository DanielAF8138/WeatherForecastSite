var mapOptions = {
    center: [37.5380,-77.4200],
    zoom: 10
}

var map = new L.map('map', mapOptions);

var layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

map.addLayer(layer);

let marker = null;
map.on('click', (event)=> {

if(marker !== null){
    map.removeLayer(marker);
}

marker = L.marker([event.latlng.lat , event.latlng.lng]).addTo(map);

document.getElementById('latitude').value = event.latlng.lat;
document.getElementById('longitude').value = event.latlng.lng;

})

var form = document.getElementById('locationForm');

// Add an event listener for the 'submit' event
form.addEventListener('submit', function(event) {
    // Prevent the form from being submitted to the server
    event.preventDefault();

    // Get the latitude and longitude values
    var latitude = document.getElementById('latitude').value;
    var longitude = document.getElementById('longitude').value;

    // Log the values
    localStorage.setItem("lon", longitude)
    localStorage.setItem("lat", latitude)

    window.location.href = 'index.html';


});


 