// Variable declarations
var userInput = document.getElementById("userInput");
var userForm = document.getElementById("formSubmit");
var lat = "";
var lon = "";
var weatherApi = "https://api.openweathermap.org/data/2.5/forecast?";
var apiKey = "5ff881f968b0b9c4fb63f514f648bb13";
var apiKey2= "6f8cebf1a17807d63882af2a6b0a578d";
var cityToCords =
  " http://api.openweathermap.org/geo/1.0/direct?q={city name}&appid={API key}";
var dayForecast = document.getElementById("current-forecast");
var inputLatAndLong = "lat=" + lat + "&lon=" + lon + "&appid=" + apikey;
var getDate = new Date();
var getWeather = "https://api.openweathermap.org/data/2.5/weather?";

var getForcast = "https://api.openweathermap.org/data/2.5/forecast?"
var day = getDate.getDate();
var month = getDate.getMonth();
var year = getDate.getFullYear();
var date = `${month} - ${day} - ${year}`;
var createButtonCount = 0;
var forecastArr = [];
let storage = 0;
let history = [];
let mainIcon = $("#currentIcon");
// functions

// this function is responsible for form submission and capturing user input
function handleFormSubmit(e) {
  // pulls input data value
  e.preventDefault();
  var input = userInput.value;
  console.log(input);
  //   make an api call with that search term and confirm data is sent back
  fetchCordinates(input);
}
// function is responsible for getting the lat and lon for the city passed
function fetchCityCordinates(city) {
  // this will make the call to get the cordinates for that city
  console.log(city)
  // var apiCall = rootEndpoint + "?q=" + city + "&appid=" + apiKey;
  // input api call with pass key
  var getCityCords =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&appid=" +
    apikey;
  fetch(getCityCords)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      lat = data[0].lat;
      lon = data[0].lon;

      fetchCityWeather();
      fetchCityForecast();
      storage++;
    });
}
// responsible for the dymanic creation of the cards based on what the user wants
// function renderCards() {
// dom manipulation for cards

// function responsible for making api with user searchterm
function fetchCityWeather() {
  // https://api.openweathermap.org/data/2.5/weather?lat= +lat +&lon=+ lon + &appid= + apiKey
  // http://api.openweathermap.org/geo/1.0/direct?q=%7Bcity name},{state code},{country code}&limit={limit}&appid={API key}

  fetch(
    getWeather +
    "lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    apiKey2 +
    "&units=imperial"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let day = document.getElementById("cityName");
      let thisIcon = data.weather[0].icon;
      var createImg = document.createElement("img");
      createImg.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + thisIcon + ".png"
      );
      $("#cityName").text(data.name + " (" + date + ") ");
      $("#tempText").text("Temp: " + data.main.temp + "°F");
      $("#windText").text("Wind:  " + data.wind.speed + "MPH");
      $("#humidityText").text("Humidity: " + data.main.humidity + "%");
      var currentCity = data.name;
      day.appendChild(createImg);
      createCityButton(currentCity);
    });
}

//   render the temp as an h1 to the user

// function renderDayForecast() {
//   // place, date, temp, wind and humity
// }

// This will create a button upon being searched
function createCityButton(currentCity) {
  var createButton = document.createElementNS("button");
  createButton.type = "submit";
  createButton.setAttribute("class", currentCity);
  createButton.className = "my-2 col-12 btn btn-primary" + currentCity;
  createButton.id = "historyButton";
  createButton.textContent = $("#historybutton");

  localStorage.setItem("history", JSON.stringify(history));
  console.log("." + currentCity);

  createButtonCount++;
}
// This will handle the history input of content
function handleHistorySubmit(e) {
  e.preventDefault();
  console.log(this.textContent);
  var input = this.textContent;
  fetchCityCordsFromHistory(input);
}

// this will get the weather from the history button
function fetchCityWeatherFromHistory() {
  fectch(getWeather +
    "lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    apiKey2 +
    "&units=imperial")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let day = document.getElementById("cityName");
      let thisIcon = data.weather[0].icon;
      var createImg = document.createElement("img");
      createImg.setAttribute("src",
        "https://openweathermap.org/img/wn/" + thisIcon + ".png");
      $("#cityName").text(data.name + " (" + date + ") ");
      $("#tempText").text("Temp: " + data.main.temp + "°F");
      $("#windText").text("Wind:  " + data.wind.speed + "MPH");
      $("#humidityText").text("Humidity: " + data.main.humidity + "%");
      day.appendChild(createImg);
    })
}
function fetchCityCordsFromHistroy(input) {
  console.log(input);
  var getCityCords = "https://api.openweathermap.org/geo/1.0/direct?q=" +
    input +
    "&appid=" +
    apikey;
  fetch(getCityCords)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      lat = data[0].lat;
      lon = data[0].lon;

      fetchCityWeatherFromHistory();
      fetchCityForecast();
    });
}
// fetch for 5 days
function fetchCityForecast() {
  forestArr = [];
  fetch(
    getForcast +
    "lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    apiKey2 +
    "&units=imperial"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      forecastArr.push(data.list[4]);
      forecastArr.push(data.list[12]);
      forecastArr.push(data.list[20]);
      forecastArr.push(data.list[29]);
      forecastArr.push(data.list[36]);
      appendForecastData();
    })
}
// appendind the 5 day data to cards
function appendForecastData() {
  for (let i = 0; i < forecastArr.length; i++) {
    var dayName = forecastArr[i].dt_txt;
    var icon = forecastArr[i].weather[0].icon;
    var temp = forecastArr[i].main.temp;
    var speed = forecastArr[i].wind.speed;
    var humidity = forecastArr[i].main.humidity;
    var day = document.getElementById("Day-" + [i]);
    var createImg = document.createElement("img");
    var createli = document.createElement("li");
    var createli2 = document.createElement("li");
    var createli3 = document.createElement("li");
    createImg.setAttribute(
      "src",
      "https://openweathermap.org/img/wn/" + icon + ".png"
    );
    createli.textContent = "Temp: " + temp + "°F";
    createli2.textContent = "Wind: " + speed + " MPH";
    createli3.textContent = "Humidity : " + humidity + " %";
    day.textContent = dayName;
    day.appendChild(createImg);
    day.appendChild(createli);
    day.appendChild(createli2);
    day.appendChild(createli3);
  }
}
// retrives and appends local storage
function getLocalStorage() {
  if (JSON.parse(localStorage.getItem("history")) !== null) {
    history = history.concat(JSON.parse(localStorage.getItem("history")));
  }
  for (let i = 0; i < history.length; i++) {
    var newButton = document.createElement("button");

    newButton.type = "submit";
    newButton.setAttribute("class", history[i]);
    newButton.className = "my-2 col-12 btn btn-primary " + history[i];
    newButton.id = "historyButton";
    newButton.textContent = history[i];
    document.getElementById("history").appendChild(newButton);
  }
}
// run to storage function on page load
getLocalStorage();
// Event listners
// listener for the search button
userForm.addEventListener("submit", handleFormSubmit);

// handle previous search buttons
$(document).on("click", "#historyButton", handleHistorySubmit);

