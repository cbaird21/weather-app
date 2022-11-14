// Variable declarations
var userInput = document.getElementById("userInput");
var userForm = document.getElementById("form-sbt");

var weatherApi = "http://api.openweathermap.org/data/3.0/weather?";

var apiKey = "5ff881f968b0b9c4fb63f514f648bb13";

var dayForecast = document.getElementById("current-forecast");

// functions

// this function is responsible for form submission and capturing user input
function handleFormSubmit() {
  // pulls input data value
  var city = userInput.value;
  console.log(city);
  //   make an api call with that search term and confirm data is sent back
  fetchCordinates(city);

  // function is responsible for getting the lat and lon for the city passed
  function fetchCordinates(city) {
    // this will make the call to get the cordinates for that city
    var rootEndPoint = "http://openweathermap.org/geo/1.0/direct?q=";

    // var apiCall = rootEndpoint + "?q=" + city + "&appid=" + apiKey;

    // input api call with pass key
    var getCityCords = rootEndPoint + city + "&limit=5" + "&appid=" + apiKey;

    fetch(getCityCords)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var lat = data[0].lat;
        var lon = data[0].lon;

        fetchWeather(lat, lon);
        // fetchCityForecast();
        // storage++;
      });
  }
  // responsible for the dymanic creation of the cards based on what the user wants
  // function renderCards() {
  // dom manipulation for cards
}

// function responsible for making api with user searchterm
function fetchWeather(lat, lon) {
  var apiCall =
    weatherApi +
    "lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    apiKey +
    "&units=imperial&";

  fetch(apiCall)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.main.temp);
      var day = document.getElementById("cityName");
      var icon = data.weather[0].icon;
      var temp = data.main.temp;
      var humidity = data.main.humidity;
      var wind = data.wind.speed;

      var createImg = document.createElement("img");
      createImg.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + icon + ".png"
      );
      $("#cityName").text(city + " (" + date + ") ");
      $("#temp").text("Temp: " + temp + "°F");
      $("#wind").text("Wind:  " + wind + "MPH");
      $("#humidity").text("Humidity: " + humidity + "%");

      day.appendChild(createImg);
      createCityButton(currentCity);
    });

  // // take the temp and lets display to the user as an h1
  // var h1El = document.createElement("h1");
  // // add text to h1
  // h1El.textContent = data.list[0].main.temp;
  // // append to element
  // dayForecast.append(h1El);
}

//   render the temp as an h1 to the user

function renderDayForecast() {
  // place, date, temp, wind and humity
}

// Event listners
// listener for the search button
userForm.addEventListener("click", function (event) {
  event.preventDefault();
  handleFormSubmit();
});

// local storage
// localStorage.getItem("cities");
// localStorage.setItem("cities");
// create an empty array in global storage
// push that value(name of the city) to that array
// ["austin", "denver" ,]
