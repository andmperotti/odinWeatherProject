import { getWeather } from "./weatherOperations.js";
import rainyGif from "./gifs/rainy.gif";
import sunnyGif from "./gifs/sunny.gif";
import cloudyGif from "./gifs/cloudy.gif";

let getWeatherButton = document.querySelector("#get-weather-button");

//event listener on 'Search' button in the html that triggers getWeather and then uses the build functions to fill in the information
getWeatherButton.addEventListener("click", async (e) => {
  e.preventDefault();
  let userCityInput = document.querySelector("#city-input-field").value;
  let convertedUserCity = userCityInput.split(" ").join("-");
  let returnedData;

  returnedData = await getWeather(convertedUserCity);
  buildToday(returnedData);
});
//function that builds content for current/todays weather
function buildToday(weatherData) {
  //wipe any pre existing content

  //weatherData will be the converted data
  let currentDay = document.querySelector("#current-weather");
  currentDay.style.backgroundImage = pickBackgroundImage(weatherData);
  //lets build dynamic elements and fill them with data from the response:

  //location
  let currentLocation = document.createElement("h1");
  currentLocation.textContent = `Location: ${weatherData.resolvedAddress}`;
  currentDay.before(currentLocation);

  //date?
  let currentDayDate = document.createElement("p");
  currentDayDate.textContent = `Date: ${weatherData.days[0].datetime}`;
  currentDay.appendChild(currentDayDate);

  //description
  let currentDescription = document.createElement("p");
  currentDescription.textContent = `Currently: ${weatherData.description}`;
  currentDay.appendChild(currentDescription);

  //temp Now
  let currentTemperature = document.createElement("p");
  currentTemperature.textContent = `Temperature: ${weatherData.days[0].temp}`;
  currentDay.appendChild(currentTemperature);

  //tempLowAndHigh
  let currentTempLowHigh = document.createElement("p");
  currentTempLowHigh.textContent = `Temp Low/High: ${weatherData.days[0].tempmin} / ${weatherData.days[0].tempmax}`;
  currentDay.appendChild(currentTempLowHigh);

  //if then precipitation (is that so far or planned?)
  //maybe if precipprob then show precip
  //i believe precip is forecasted precipitation for the day

  let currentPrecipitationForecast = document.createElement("p");
  currentPrecipitationForecast.textContent = `Predicted precipitation for day: ${weatherData.days[0].precip || "none"}`;
  currentDay.appendChild(currentPrecipitationForecast);

  //humidity level
  let currentHumidity = document.createElement("p");
  currentHumidity.textContent = `Current Humidity: ${weatherData.days[0].humidity}`;
  currentDay.appendChild(currentHumidity);

  //if then snow (>0)  (is that so far or planned?)
  let currentSnowForecast = document.createElement("p");
  currentSnowForecast.textContent = `Snow Amount Forecasted: ${weatherData.days[0].snow || "none"}`;
  currentDay.appendChild(currentSnowForecast);

  //sunrise sunset times
  let currentSunriseSunset = document.createElement("p");
  currentSunriseSunset.textContent = `Sunrise & Sunset times: ${weatherData.days[0].sunrise} & ${weatherData.days[0].sunset}`;
  currentDay.appendChild(currentSunriseSunset);

  //cloud cover
  let currentCloudCover = document.createElement("p");
  currentCloudCover.textContent = `Cloud Cover: ${weatherData.days[0].cloudCover}`;
  currentDay.appendChild(currentCloudCover);

  //wind speed and direction
  let currentWind = document.createElement("p");
  currentWind.textContent = `Wind speed & Direction: ${weatherData.days[0].windspeed} ${getWindDirection(weatherData.days[0].winddir)}`;
  currentDay.appendChild(currentWind);

  //day conditions
  let currentConditions = document.createElement("p");
  currentConditions.textContent = `Days conditions: ${weatherData.days[0].conditions}`;
  currentDay.appendChild(currentConditions);

  //change background image of currentDay
  currentDay.style.background = `no-repeat url(${pickBackgroundImage(weatherData.days[0].icon)})`;
  currentDay.style.backgroundSize = "cover";
}
//function that calculates direction of wind
function getWindDirection(directionDeg) {
  switch (true) {
    case directionDeg > 330 || directionDeg < 30:
      return "North";
      break;
    case directionDeg >= 30 && directionDeg <= 60:
      return "North East";
      break;
    case directionDeg > 60 && directionDeg < 120:
      return "East";
      break;
    case directionDeg >= 120 && directionDeg <= 150:
      return "South East";
      break;
    case directionDeg > 150 && directionDeg < 210:
      return "South";
      break;
    case directionDeg >= 210 && directionDeg <= 240:
      return "South West";
      break;
    case directionDeg > 240 && directionDeg < 300:
      return "West";
      break;
    case directionDeg >= 300 && directionDeg <= 330:
      return "North West";
      break;
  }
}

//function that picks a specific image to use as a background image to current weather and future weather days
function pickBackgroundImage(iconData) {
  switch (iconData) {
    case "clear-day":
      return sunnyGif;
      break;
    case "rain":
      return rainyGif;
      break;
    case "partly-cloudy-day":
      return cloudyGif;
      break;
  }
}
//might need a function to change text color depending on the background gif

//error reporting functionality for when users try to enter invalid data to the input field

//button to change Fahrenheit to Celsius
