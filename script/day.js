function writeweatherdata (todayString) {
    // Get the h1 elements
    var todayElement = document.getElementById('today');


    // Set the text of the h1 elements
    todayElement.textContent = todayString;

}


function getWeatherWithZip(zip){
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=b472bf7cffc84469950230129230412&q=${zip}&days=3`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            // Create strings with the weather data
            var todayString = `Today in ${data.location.name}, it is ${data.current.condition.text} with a temperature of ${data.current.temp_f}°F (${data.current.temp_c}°C).`;
            
            writeweatherdata(todayString)
        })
        .catch(error => console.error('Error:', error));
}

function getWeatherWithCoords (lon, lat){
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=b472bf7cffc84469950230129230412&q=${lat},${lon}&days=3`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            // Create strings with the weather data
            var todayString = `Today in ${data.location.name}, it is ${data.current.condition.text} with a temperature of ${data.current.temp_f}°F (${data.current.temp_c}°C).`;

            writeweatherdata(todayString)
        })
        .catch(error => console.error('Error:', error));
}

if (localStorage.getItem("zip") != null){
    getWeatherWithZip(localStorage.getItem("zip"))
}

if(localStorage.getItem("lon") != null && localStorage.getItem("lat") != null){
    getWeatherWithCoords(localStorage.getItem("lon"), localStorage.getItem("lat"))
}



document.addEventListener('DOMContentLoaded', function() {
    
    var latitude = localStorage.getItem('lat');
    var longitude = localStorage.getItem('lon');

    // Log the values to the console
    console.log('Latitude: ' + latitude);
    console.log('Longitude: ' + longitude);

    if (longitude != null && latitude != null){
        // Fetch the weather data using the latitude and longitude
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=b472bf7cffc84469950230129230412&q=${latitude},${longitude}&days=1`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            var date1 = `${data.forecast.forecastday[0].date}`
            var date1 = swapDateFormat(date1);
            var date = new Date(date1);
            var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var dotwString = daysOfWeek[date.getDay()];

            var iconurl = `${data.forecast.forecastday[0].day.condition.icon}`

            var maxString = `High: ${data.forecast.forecastday[0].day.maxtemp_f}°F`

            var minString = `Low: ${data.forecast.forecastday[0].day.mintemp_f}°F`

            writeDayOfTheWeek(dotwString, `day0title`);
            putInIcons(iconurl, `day0icon`);
            setMax(maxString, `max0`);
            setMin(minString, `min0`);


        })
    .catch(error => console.error('Error:', error));
    }

    else if (localStorage.getItem("zip") != null){

        var zipcode = localStorage.getItem('zip');

        fetch(`https://api.weatherapi.com/v1/forecast.json?key=b472bf7cffc84469950230129230412&q=${zipcode}&days=1`)

        .then(response => response.json())
        .then(data => {
            console.log(data);

            var date1 = `${data.forecast.forecastday[0].date}`
            var date1 = swapDateFormat(date1);
            var date = new Date(date1);
            var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var dotwString = daysOfWeek[date.getDay()];

            var iconurl = `${data.forecast.forecastday[0].day.condition.icon}`

            var maxString = `High: ${data.forecast.forecastday[0].day.maxtemp_f}°F`

            var minString = `Low: ${data.forecast.forecastday[0].day.mintemp_f}°F`

            writeDayOfTheWeek(dotwString, `day0title`);
            putInIcons(iconurl, `day0icon`);
            setMax(maxString, `max0`);
            setMin(minString, `min0`);
        })
    }
});



function writeDayOfTheWeek (dotwString, number) {

    var element = document.getElementById(number);

    element.textContent = dotwString;
}

function putInIcons (iconurl, number) {

    var img = document.getElementById(number);
    
    img.src = iconurl;
}

function setMax (maxString, number) {

    var element = document.getElementById(number);
    
    element.innerText = maxString;
}

function setMin (minString, number) {

    var element = document.getElementById(number);
    
    element.innerText = minString;
}

function swapDateFormat(inputDate) {
    var dateParts = inputDate.split("-");
    return dateParts[1] + "-" + dateParts[2] + "-" + dateParts[0];
 }