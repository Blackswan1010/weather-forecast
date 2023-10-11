var userInput = document.getElementById("input");
var citiesDiv = document.getElementById("cities");
var today = document.getElementById("today");

var searchBtn = document.querySelector("#searchBtn");
var cityButton = document.querySelector(".city-buttons");
var apiKey = 'c6d6f56d59b4c33747b4f2496da55c91';
var cities = ['atlanta', 'denver', 'seattle', 'san+francisco', 'orlando', 'new+york', 'chicago', 'austin'];
var cityDetails = [];


// Rendering and dynamically appending buttons under the search bar using a for loop
for (var i = 0; i < cities.length; i++) {

    // Apikey used to retrieve data of the cities from open weather with an additional query parameter
    var queryUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cities[i] + '&appid=' + apiKey + "&units=imperial";


    fetch(queryUrl)
    
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log('data', data);
            var cityName = document.createElement('button');
            cityName.setAttribute("class", "btn btn-secondary");
            cityName.setAttribute("type", "button");
            cityName.textContent = data.city.name;
            citiesDiv.appendChild(cityName);
            // cityDetails[0] = data.list[0].dt_txt;
            // cityDetails[1] = data.list[0].main.temp + "\u00B0F";
            // cityDetails[2] = data.list[0].wind.speed  + " MPH";
            // cityDetails[3] = data.list[0].main.humidity + " %";


            if (!localStorage.getItem(cities[i])) {
                localStorage.setItem(cities[i], queryUrl);
            }
        })

}

searchBtn.addEventListener("click", function (event) {
    event.preventDefault();

    var target = userInput;
    if (target.matches('#input')) {

        var place = target.value.toLowerCase().replace(" ", "+");

        fetch(localStorage.getItem(place))

            .then(function (response) {
                return response.json();
            })

            // 
            .then(function (data) {
                today.children[0].textContent = data.city.name + "(" + data.list[0].dt_txt + ")";
                today.children[1].textContent = "Tempurature: " + data.list[0].main.temp + "\u00B0F";
                today.children[2].textContent = "Wind: " + data.list[0].wind.speed + " MPH";
                today.children[3].textContent = "Humidity: " + data.list[0].main.humidity + " %";
                // 
                for (var i = 1; i < 6; i++) {
                    var card = document.getElementById('day-' + i.toString());
                    card.children[0].textContent = data.list[(i * 8) - 1].dt_txt;
                    card.children[1].textContent = "Tempurature: " + data.list[(i * 8) - 1].main.temp + "\u00B0F";
                    card.children[2].textContent = "Wind: " + data.list[(i * 8) - 1].wind.speed + " MPH";
                    card.children[3].textContent = "Humidity: " + data.list[(i * 8) - 1].main.humidity + " %";
                }
            })
    }
})


cityButton.addEventListener("click", function (event) {
    event.preventDefault();

    // 
    var target = event.target;
    if (target.matches(".btn")) {

        // 
        var place = target.textContent.toLowerCase().replace(" ", "+");
        fetch(localStorage.getItem(place))

            .then(function (response) {
                return response.json();
            })

            // 
            .then(function (data) {

                today.children[0].textContent = data.city.name + "(" + data.list[0].dt_txt + ")";
                today.children[1].textContent = "Tempurature: " + data.list[0].main.temp + "\u00B0F";
                today.children[2].textContent = "Wind: " + data.list[0].wind.speed + " MPH";
                today.children[3].textContent = "Humidity: " + data.list[0].main.humidity + " %";

                // 
                var icon = data.list[0].weather[0].icon;
                var image = document.createElement("img");
                image.src = "https://openweathermap.org/img/w/" + icon + ".png";
                today.children[0].appendChild(image);

                // 
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
