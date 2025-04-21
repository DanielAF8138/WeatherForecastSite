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
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=b472bf7cffc84469950230129230412&q=${latitude},${longitude}&days=7`)
        .then(response => response.json())
        .then(async data => {
            console.log(data);
            
            for (let i = 0; i < 7; i++) {
                var date1 = `${data.forecast.forecastday[i].date}`
                var date1 = swapDateFormat(date1);
                var date = new Date(date1);
                var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                var dotwString = daysOfWeek[date.getDay()];

                //var iconurl = `${data.forecast.forecastday[i].day.condition.icon}`
                var iconurl = await searchGiphy(data.forecast.forecastday[i].day.condition.text);

                var maxString = `High: ${data.forecast.forecastday[i].day.maxtemp_f}°F`

                var minString = `Low: ${data.forecast.forecastday[i].day.mintemp_f}°F`

                writeDayOfTheWeek(dotwString, `day${i}title`);
                putInIcons(iconurl, `day${i}icon`);
                setMax(maxString, `max${i}`);
                setMin(minString, `min${i}`);
            }
        })
        .catch(error => console.error('Error:', error));     
    }   else if (localStorage.getItem("zip") != null){

        fetch(`https://api.weatherapi.com/v1/forecast.json?key=b472bf7cffc84469950230129230412&q=${zipcode}&days=14`)

        .then(response => response.json())
        .then(async data => {
            console.log(data);
            
            for (let i = 0; i < 14; i++) {
                var date1 = `${data.forecast.forecastday[i].date}`
                var date1 = swapDateFormat(date1);
                var date = new Date(date1);
                var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                var dotwString = daysOfWeek[date.getDay()];

                //var iconurl = `${data.forecast.forecastday[i].day.condition.icon}`
                var iconurl = await searchGiphy(data.forecast.forecastday[i].day.condition.text);

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
    console.log('iconurl', iconurl)
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

async function searchGiphy(word) {
  const giphyResp = await fetch(
    `https://api.giphy.com/v1/stickers/search?api_key=DqDqE5OTJMZkeTKmfCrx287T2jQL1o6t&q=${word}&limit=1&offset=0&rating=r&lang=en&bundle=messaging_non_clips`
  );

  const giphyResultJSON = await giphyResp.json();

  const resultURL = giphyResultJSON.data[0].images.original.url;
  console.log('giphy gif url', resultURL)
  return resultURL;
}


