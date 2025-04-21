if (localStorage.getItem("zip") != null){
    getWeatherWithZip(localStorage.getItem("zip"))
}

document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting via the browser
    var zip = document.getElementById('zipcode').value;
    localStorage.setItem("zip", zip)
    getWeatherWithZip(zip);
});

function writeweatherdata (todayString, tomorrowString, thisWeekString) {
    // Get the h1 elements
    var todayElement = document.getElementById('today');
    var tomorrowElement = document.getElementById('tomorrow');
    var thisWeekElement = document.getElementById('thisweek');

    // Set the text of the h1 elements
    todayElement.textContent = todayString;
    tomorrowElement.textContent = tomorrowString;
    thisWeekElement.textContent = thisWeekString;
}


// Add an event listener for the 'DOMContentLoaded' event
document.addEventListener('DOMContentLoaded', function() {
    // Get the latitude and longitude values from local storage
    var latitude = localStorage.getItem('lat');
    var longitude = localStorage.getItem('lon');
    
    // Log the values to the console
    console.log('Latitude: ' + latitude);
    console.log('Longitude: ' + longitude);

    if (longitude != null){
        // Fetch the weather data using the latitude and longitude
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=b472bf7cffc84469950230129230412&q=${latitude},${longitude}&days=3`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            // Create strings with the weather data
            var todayString = `Today in ${data.location.name}, it is ${data.current.condition.text} with a temperature of ${data.current.temp_f}°F (${data.current.temp_c}°C).`;
            var tomorrowString = `Tomorrow's forecast is ${data.forecast.forecastday[1].day.condition.text} with a high of ${data.forecast.forecastday[1].day.maxtemp_f}°F (${data.forecast.forecastday[1].day.maxtemp_c}°C) and a low of ${data.forecast.forecastday[1].day.mintemp_f}°F (${data.forecast.forecastday[1].day.mintemp_c}°C).`;
            var thisWeekString = `The day after tomorrow's forecast is ${data.forecast.forecastday[2].day.condition.text} with a high of ${data.forecast.forecastday[2].day.maxtemp_f}°F (${data.forecast.forecastday[2].day.maxtemp_c}°C) and a low of ${data.forecast.forecastday[2].day.mintemp_f}°F (${data.forecast.forecastday[2].day.mintemp_c}°C).`;
            
            writeweatherdata(todayString, tomorrowString, thisWeekString)
        })
        .catch(error => console.error('Error:', error));
    }
    else if (localStorage.getItem("zip") != null){
        getWeatherWithZip(localStorage.getItem(zip))
    }
    

});

function getWeatherWithZip(zip){
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=b472bf7cffc84469950230129230412&q=${zip}&days=3`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            // Create strings with the weather data
            var todayString = `Today in ${data.location.name}, it is ${data.current.condition.text} with a temperature of ${data.current.temp_f}°F (${data.current.temp_c}°C).`;
            var tomorrowString = `Tomorrow's forecast is ${data.forecast.forecastday[1].day.condition.text} with a high of ${data.forecast.forecastday[1].day.maxtemp_f}°F (${data.forecast.forecastday[1].day.maxtemp_c}°C) and a low of ${data.forecast.forecastday[1].day.mintemp_f}°F (${data.forecast.forecastday[1].day.mintemp_c}°C).`;
            var thisWeekString = `The day after tomorrow's forecast is ${data.forecast.forecastday[2].day.condition.text} with a high of ${data.forecast.forecastday[2].day.maxtemp_f}°F (${data.forecast.forecastday[2].day.maxtemp_c}°C) and a low of ${data.forecast.forecastday[2].day.mintemp_f}°F (${data.forecast.forecastday[2].day.mintemp_c}°C).`;
            
            writeweatherdata(todayString, tomorrowString, thisWeekString)
        })
        .catch(error => console.error('Error:', error));
}

document.getElementById('export').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting via the browser
    exportLocalStorage();
});

document.getElementById('clear').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting via the browser
    // Clear all data from local storage
    localStorage.clear();
    // Refresh the page
    location.reload();

});

function exportLocalStorage(){
    // Create an object to hold the local storage data
    var localStorageData = {};

    // Loop over all keys in local storage
    for (var i = 0; i < localStorage.length; i++) {
        // Get the key
        var key = localStorage.key(i);

        // Get the value
        var value = localStorage.getItem(key);

        // Add the key-value pair to the object
        localStorageData[key] = value;
    }

    // Convert the object to a JSON string
    var json = JSON.stringify(localStorageData);

    // Create a new Blob object from the JSON string
    var blob = new Blob([json], {type: "application/json"});

    // Create a link element
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = 'localStorage.json';

    // Append the link to the body (required for Firefox)
    document.body.appendChild(link);

    // Simulate a click on the link
    link.click();

    // Remove the link from the body
    document.body.removeChild(link);
}




