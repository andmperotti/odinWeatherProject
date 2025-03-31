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
  console.log(weatherData);
}

//error reporting functionality for when users try to enter invalid data to the input field

//button to change Fahrenheit to Celsius
