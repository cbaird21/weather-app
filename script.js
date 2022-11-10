// Variable declarations
var userInput = document.getElementById("user-input");
var userForm = document.getElementById("form-sbt");

var weatherApi = "http://api.openweathermap.org/data/3.0/forecast?";

var apiKey = "";

var dayForecast=document.getElementById('current-forecast');


// functions


// function is responsible for getting the lat and lon for the city passed
function fetchCoordinates(city){
    // this will make the call to get the cordinates for that city
    var rootEndpoint = "http://openweathermap.org/geo/1.0/direct";

    var apiCall = rootEndpoint + "?q=" + city + "&appid=" + apiKey

    // input api call with pass key
fetch(apiCall)
.then(function(response){
    return response .json();
})
.then(function(data){
    var lat = data[0].lat;
    var lon = data[0].lon;
    fetchWeather(lat,lon)
})
}
// responsible for the dymanic creation of the cards based on what the user wants
function renderCards(){
// dom manipulation for cards
}

// function responsible for making api with user searchterm
function fetchWeather(lat, lon) {
  var apiCall = weatherApi + "lat=" + lat + "&lon=" + lon + "&units=imperial&" "appid=APIKEY";
  
  
  fetch(apiCall)
  .then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data.list[0].main.temp);

    // take the temp and lets display to the user as an h1
    var h1El = document.createElement('h1');
    // add text to h1 
    h1El.textContent = data.list[0].main.temp;
    // append to element
    dayForecast.append(h1El);
  });

//   render the temp as an h1 to the user

}
function renderDayForecast(){
// place, date, temp, wind and humity
}

// this function is responsible for form submission and capturing user input
function handleFormSubmit(e) {
  e.preventDefault();
  // pulls input data value
  var input = userInput.value;
  //   make an api call with that search term and confirm data is sent back
  fetchCordinates()
}

// Event listners
userForm.addEventListener("submit", handleFormSubmit);

// local storage
localStorage.getItem('cities')
localStorage.setItem('cities', )
// create an empty array in global storage
// push that value(name of the city) to that array
// ["austin", "denver" ,]
