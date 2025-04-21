document.addEventListener('DOMContentLoaded', function() {
    // Get the latitude and longitude values from local storage
    var latitude = localStorage.getItem('lat');
    var longitude = localStorage.getItem('lon');
    var zipcode = localStorage.getItem('zip');
    
    // Log the values to the console
    console.log('Latitude: ' + latitude);
    console.log('Longitude: ' + longitude);
    console.log('Zipcode: ' + zipcode);

    if (longitude != null){
        // Fetch the weather data using the latitude and longitude
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=b472bf7cffc84469950230129230412&q=${latitude},${longitude}&days=14`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            for (let i = 0; i < 14; i++) {
                var date1 = `${data.forecast.forecastday[i].date}`
                var dotwString = swapDateFormat(date1);

                var iconurl = `${data.forecast.forecastday[i].day.condition.icon}`

                var maxString = `High: ${data.forecast.forecastday[i].day.maxtemp_f}°F`

                var minString = `Low: ${data.forecast.forecastday[i].day.mintemp_f}°F`

                writeDayOfTheWeek(dotwString, `day${i}title`);
                putInIcons(iconurl, `day${i}icon`);
                setMax(maxString, `max${i}`);
                setMin(minString, `min${i}`);
            }
        })
        .catch(error => console.error('Error:', error));

    } else if (localStorage.getItem("zip") != null){

        fetch(`https://api.weatherapi.com/v1/forecast.json?key=b472bf7cffc84469950230129230412&q=${zipcode}&days=14`)

        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            for (let i = 0; i < 14; i++) {
                var date1 = `${data.forecast.forecastday[i].date}`
                var dotwString = swapDateFormat(date1);

                var iconurl = `${data.forecast.forecastday[i].day.condition.icon}`

                var maxString = `High: ${data.forecast.forecastday[i].day.maxtemp_f}°F`

                var minString = `Low: ${data.forecast.forecastday[i].day.mintemp_f}°F`

                writeDayOfTheWeek(dotwString, `day${i}title`);
                putInIcons(iconurl, `day${i}icon`);
                setMax(maxString, `max${i}`);
                setMin(minString, `min${i}`);
            }
        })
        .catch(error => console.error('Error:', error));
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
    return dateParts[1] + "-" + dateParts[2];
 }