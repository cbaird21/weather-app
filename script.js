// Variable declarations
var userInput = document.getElementById("userInput");
var userForm = document.getElementById("form-sbt");
var lat = "";
var lon = "";
var forecastApi = "http://api.openweathermap.org/data/2.5/forecast?lat=";
var weatherApi = "https:api.openweathermap.org/data/2.5/weather?lat=";
var apiKey = "5ff881f968b0b9c4fb63f514f648bb13";

var dayForecast = document.getElementById("current-forecast");

var getDate = new Date();

var day = getDate.getDate();
var month = getDate.getMonth();
var year = getDate.getFullYear();
var date = `${month} - ${day} - ${year}`;
// functions

// this function is responsible for form submission and capturing user input
function handleFormSubmit() {
  // pulls input data value
  var city = userInput.value;
  console.log(city);
  //   make an api call with that search term and confirm data is sent back
  fetchCordinates(city);
}
// function is responsible for getting the lat and lon for the city passed
function fetchCordinates(city) {
  // this will make the call to get the cordinates for that city
  var rootEndPoint = "http://api.openweathermap.org/geo/1.0/direct?q=";

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

// function responsible for making api with user searchterm
function fetchWeather(lat, lon) {
  var apiCall =
    weatherApi + lat + "&lon=" + lon + "&units=imperial" + "&appid=" + apiKey;
  // https://api.openweathermap.org/data/2.5/weather?lat= +lat +&lon=+ lon + &appid= + apiKey
  // http://api.openweathermap.org/geo/1.0/direct?q=%7Bcity name},{state code},{country code}&limit={limit}&appid={API key}

  fetch(apiCall)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      // console.log("City: "+data.name);
      // console.log("temp: "+ data.main.temp);
      // console.log("wind: "+ data.wind.speed);
      // console.log("humidity: "+ data.main.humidity);
      var cityName = data.name;
      var icon = data.weather[0].icon;
      var temp = data.main.temp;
      var humidity = data.main.humidity;
      var speed = data.wind.speed;
      // take the temp and lets display to the user as an h1
      var divEl = document.createElement("div");
      divEl.setAttribute("id", "container");
      // add text to
      divEl.innerHTML = `<div class="card " style="width: 18rem;">
          <div class="card-body border rounded bg-dark text-light">
            <h1 class="card-title">
              ${cityName} ${icon} (${date})
            </h1>
            <h5 class="card-subtitle temp mb-2 text-muted">Temp: ${temp}F</h5>
            <h5 class="card-subtitle wind">Wind: ${speed} MPH</h5>
            <h5 class="card-subtitle humidity">Humidity: ${humidity} %</h5>
          </div>
        </div>`;
      // append to element
      dayForecast.append(divEl);
    });
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
