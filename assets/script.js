// Declaring variables assigned by the id tags
var userInput = document.getElementById("input");
var citiesDiv = document.getElementById("cities");
var today = document.getElementById("today");
var searchBtn = document.querySelector("#searchBtn");
var cityButton = document.querySelector(".city-buttons");

var apiKey = 'c6d6f56d59b4c33747b4f2496da55c91';
var cities = ['atlanta', 'denver', 'seattle', 'san+francisco', 'orlando', 'new+york', 'chicago', 'austin'];
// var cityDetails = [];


// Rendering and dynamically appending buttons under the search bar using a for loop
for (var i = 0; i < cities.length; i++) {

    // Apikey used to retrieve data of the cities from open weather with an additional query parameter
    var queryUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cities[i] + '&appid=' + apiKey + "&units=imperial";
    fetch(queryUrl)

        // Check repsonse status
        .then(function (response) {
            return response.json();
        })

        // Console logging data from openweather's api
        .then(function (data) {
            console.log('data', data);
            var cityName = document.createElement('button');
            cityName.setAttribute("class", "btn btn-secondary");
            cityName.setAttribute("type", "button");
            cityName.textContent = data.city.name;
            citiesDiv.appendChild(cityName);
            // Ignore the following comments below
            // cityDetails[0] = data.list[0].dt_txt;
            // cityDetails[1] = data.list[0].main.temp + "\u00B0F";
            // cityDetails[2] = data.list[0].wind.speed  + " MPH";
            // cityDetails[3] = data.list[0].main.humidity + " %";

            // Setting key-value pair cities name and apikey
            if (!localStorage.getItem(cities[i])) {
                localStorage.setItem(cities[i], queryUrl);
            }
        })

}

//Adding eventlistener for the search button 
searchBtn.addEventListener("click", function (event) {
    event.preventDefault();

    // Assigns target to user input
    var target = userInput;
    // Checks the element if it has an id of 'input'
    if (target.matches('#input')) {

        // Holding the formatted user input value
        var place = target.value.toLowerCase().replace(" ", "+");

        // Calls for an akikey from local storage with the key value
        fetch(localStorage.getItem(place))

            // Checks repsonse status
            .then(function (response) {
                return response.json();
            })

            // Assigning values from traversing the called apikey to the text for today's weather's date, tempurature, wind, and humidity
            .then(function (data) {

                today.children[0].textContent = data.city.name + "(" + data.list[0].dt_txt + ")";
                today.children[1].textContent = "Tempurature: " + data.list[0].main.temp + "\u00B0F";
                today.children[2].textContent = "Wind: " + data.list[0].wind.speed + " MPH";
                today.children[3].textContent = "Humidity: " + data.list[0].main.humidity + " %";

                // Appending an icon to the first child for today's weather
                var icon = data.list[0].weather[0].icon;
                var image = document.createElement("img");
                image.src = "https://openweathermap.org/img/w/" + icon + ".png";
                today.children[0].appendChild(image);

                // Iterating through a loop to update the 5-day forecast
                for (var i = 1; i < 6; i++) {
                    var card = document.getElementById('day-' + i.toString());
                    card.children[0].textContent = data.list[(i * 8) - 1].dt_txt;
                    card.children[1].textContent = "Tempurature: " + data.list[(i * 8) - 1].main.temp + "\u00B0F";
                    card.children[2].textContent = "Wind: " + data.list[(i * 8) - 1].wind.speed + " MPH";
                    card.children[3].textContent = "Humidity: " + data.list[(i * 8) - 1].main.humidity + " %";
                    var icon = data.list[(i * 8) - 1].weather[0].icon;
                    var image = document.createElement("img");
                    image.src = "https://openweathermap.org/img/w/" + icon + ".png";
                    card.children[0].appendChild(image);
                }
            })
    }
})

//Adding eventlistener for the buttons under the search bar 
cityButton.addEventListener("click", function (event) {
    event.preventDefault();

    // Assigns target to the current object
    var bullseye = event.target;
    if (bullseye.matches(".btn")) {

        // Holding the formatted current object value
        var place = bullseye.textContent.toLowerCase().replace(" ", "+");

        // Calls for an akikey from local storage with the key value
        fetch(localStorage.getItem(place))

            // Checks repsonse status
            .then(function (response) {
                return response.json();
            })

            // Assigning values from traversing the called apikey to the text for today's weather's date, tempurature, wind, and humidity
            .then(function (data) {

                // Assigning values from traversing the called apikey to the text for today's weather
                today.children[0].textContent = data.city.name + "(" + data.list[0].dt_txt + ")";
                today.children[1].textContent = "Tempurature: " + data.list[0].main.temp + "\u00B0F";
                today.children[2].textContent = "Wind: " + data.list[0].wind.speed + " MPH";
                today.children[3].textContent = "Humidity: " + data.list[0].main.humidity + " %";

                // Appending an icon to the first child for today's weather
                var icon = data.list[0].weather[0].icon;
                var image = document.createElement("img");
                image.src = "https://openweathermap.org/img/w/" + icon + ".png";
                today.children[0].appendChild(image);

                // Iterating through a loop to update the 5-day forecast
                for (var i = 1; i < 6; i++) {
                    var card = document.getElementById('day-' + i.toString());
                    card.children[0].textContent = data.list[(i * 8) - 1].dt_txt;
                    card.children[1].textContent = "Tempurature: " + data.list[(i * 8) - 1].main.temp + "\u00B0F";
                    card.children[2].textContent = "Wind: " + data.list[(i * 8) - 1].wind.speed + " MPH";
                    card.children[3].textContent = "Humidity: " + data.list[(i * 8) - 1].main.humidity + " %";
                    var icon = data.list[(i * 8) - 1].weather[0].icon;
                    var image = document.createElement("img");
                    image.src = "https://openweathermap.org/img/w/" + icon + ".png";
                    card.children[0].appendChild(image);

                }
            })
    }

});
