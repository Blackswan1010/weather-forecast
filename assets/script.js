var userInput = document.getElementById("input");
var citiesDiv = document.getElementById("cities");
var searchBtn = document.getElementById("searchBtn");
var today = document.getElementById("today");
var fiveDays = document.getElementById("5-day");
var cityButton = document.querySelector(".city-buttons");
var apiKey = 'c6d6f56d59b4c33747b4f2496da55c91';
var city = ['atlanta', 'denver', 'seattle', 'san+francisco', 'orlando', 'new+york', 'chicago', 'austin'];


// Rendering and dynamically appending locations under the search bar
for (var i = 0; i < city.length; i++) {
    var queryUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city[i] + '&appid=' + apiKey + "&units=imperial";
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

        })
    if (!localStorage.getItem(city[i])) {
        localStorage.setItem(city[i], queryUrl);
    }
}


cityButton.addEventListener("click", function (event) {
    event.preventDefault();

    var target = event.target;
    if (target.matches(".btn")) {
        console.log(target.textContent);
        fetch(localStorage.getItem(target.textContent.toLowerCase()))
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                today.children[0].textContent = data.city.name + "(" + data.list[0].dt_txt + ")";
                today.children[1].textContent = "Tempurature: " + data.list[0].main.temp + "\u00B0F";
                today.children[2].textContent = "Wind: " + data.list[0].wind.speed + " MPH";
                today.children[3].textContent = "Humidity: " + data.list[0].main.humidity + " %";

                // console.log("clicked");

            })
    }

});

// temp, wind, humidity, picture, date