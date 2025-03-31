import { getWeather } from "./weatherOperations.js";

let getWeatherButton = document.querySelector("#get-weather-button");

//event listener on 'Search' button in the html that triggers getWeather and then uses the build functions to fill in the information
getWeatherButton.addEventListener("click", async (e) => {
  e.preventDefault();
  let userCityInput = document.querySelector("#city-input-field").value;
  console.log(userCityInput);
  let convertedUserCity = userCityInput.split(" ").join("-");
  let returnedData;

  returnedData = await getWeather(convertedUserCity);
  buildToday(returnedData);
});
//function that builds content for current/todays weather
function buildToday(weatherData) {
  //weatherData will be the converted data
  let currentDay = document.querySelector("#current-weather");
  currentDay.style.backgroundImage = pickBackgroundImage(weatherData);
  //kind of think you could build dynamic elements instead, for description, city name, date, time, humidity, temp now, temp low, temp high, precipitation so far, precip chance
}

//function that picks a specific image to use as a background image to current weather and future weather days
function pickBackgroundImage() {
  //I think use days[0].icon
}

//error reporting functionality for when users try to enter invalid data to the input field

//button to change Fahrenheit to Celsius
