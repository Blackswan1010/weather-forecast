# Weather-Forecast

## Technology Used

| Technology Used         | Resource URL           | 
| ------------- |:-------------:| 
| HTML    | [https://developer.mozilla.org/en-US/docs/Web/HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) | 
| CSS     | [https://developer.mozilla.org/en-US/docs/Web/CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)      |   
| Git | [https://git-scm.com/](https://git-scm.com/)     | 
| Javascript | [https://api.jquery.com](https://api.jquery.com/)  |
| Openweather API | [https://openweathermap.org/api](https://openweathermap.org/api) |

## Description

Making a weather-forecast app using Openweather API and Javascript!

Deployed Site []()

## API
```js
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
```
Fetching different weather data from different cities by providing the name from the array and API key. Then handling the response to a json format.

```js
.then(function (data) {
    today.children[0].textContent = data.city.name + "(" + data.list[0].dt_txt + ")";
    today.children[1].textContent = "Tempurature: " + data.list[0].main.temp + "\u00B0F";
    today.children[2].textContent = "Wind: " + data.list[0].wind.speed + " MPH";
    today.children[3].textContent = "Humidity: " + data.list[0].main.humidity + " %";

```
Updating the HTML contents with the obtained data of the city's name, tempurature, wind speed, and humidity from the weather API.

## Author Info

#### Anthony Nguyen
```md
* [Github](https://github.com/Blackswan1010)
```

## Credits

Everyone in bootcamp

## License

N/A
