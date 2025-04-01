import { getWeather } from "./weatherOperations.js";
import rainyImg from "./images/rainy.jpg";
import sunnyImg from "./images/sunny.jpg";
import cloudyImg from "./images/cloudy.jpg";

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
  let backgroundImage = pickBackgroundImage(weatherData.days[0].icon);
  currentDay.style.background = `no-repeat url(${backgroundImage})`;
  currentDay.style.backgroundSize = "cover";

  currentDay.style.color = pickTextColor(backgroundImage);

  //call the function to fill in the next 7 days weather information (using slice to skip over the current day aka days[0])
  fillNextSeven(weatherData.days.slice(1));
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
      return sunnyImg;
      break;
    case "rain":
      return rainyImg;
      break;
    case "partly-cloudy-day":
      return cloudyImg;
      break;
  }
}
//might need a function to change text color depending on the background img
function pickTextColor(backgroundImage) {
  switch (backgroundImage) {
    case rainyImg:
      return "white";
      break;
    case cloudyImg:
      return "white";
      break;
    case sunnyImg:
      return "black";
      break;
  }
}
//function to fill in  the next 7 days of weather information
function fillNextSeven(weatherDaysArr) {
  //for loop to iterate over next 7 days of weatherData
  for (let i = 0; i < weatherDaysArr.length; i++) {
    //dynamic element
    let tempDaySection = document.querySelector(`#day-${i + 1}`);
    //date
    let tempDate = document.createElement("h3");
    tempDate.textContent = weatherDaysArr[i].datetime;
    tempDaySection.appendChild(tempDate);
    //conditions, which is a much shorter summary of the days weather than description, because I want these elements to be smaller
    let tempConditions = document.createElement("p");
    tempConditions.textContent = weatherDaysArr[i].conditions;
    tempDaySection.appendChild(tempConditions);
    //low/max temp range
    let tempLowHigh = document.createElement("p");
    tempLowHigh.textContent = `${weatherDaysArr[i].tempmin} / ${weatherDaysArr[i].tempmax}`;
    tempDaySection.appendChild(tempLowHigh);
    //if precipitation then how much is anticipated
    if (weatherDaysArr[i].precip > 0) {
      let temmpPrecipitation = document.createElement("p");
      temmpPrecipitation.textContent = weatherDaysArr[i].precip;
      tempDaySection.appendChild(temmpPrecipitation);
    }
    //if snow then how much is anticipated
    if (weatherDaysArr[i].snow > 0) {
      let tempSnow = document.createElement("p");
      tempSnow.textContent = weatherDaysArr[i].snow;
      tempDaySection.appendChild(tempSnow);
    }
    //if wind then how fast and in what direction
    if (weatherDaysArr[i].windspeed > 0) {
      let tempWind = document.createElement("p");
      tempWind.textContent = `${weatherDaysArr[i].windspeed} ${getWindDirection(weatherDaysArr[i].winddir)}`;
      tempDaySection.appendChild(tempWind);
    }
  }
}

//error reporting functionality for when users try to enter invalid data to the input field

//button listener to change Fahrenheit to Celsius, and miles per hour to kilometers per hour for wind readouts
