var userInput = document.getElementById("input");
var citiesDiv = document.getElementById("cities");
var searchBtn = document.getElementById("searchBtn");
var apiKey = 'c6d6f56d59b4c33747b4f2496da55c91';
var city = ['atlanta', 'denver', 'seattle', 'san+francisco', 'orlando', 'new+york', 'chicago', 'austin'];


for (var i = 0; i < city.length; i++) {
    var queryUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city[i] + '&appid=' + apiKey;
    fetch(queryUrl)
        .then(function (response) {
            // console.log('response', response);
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

}



