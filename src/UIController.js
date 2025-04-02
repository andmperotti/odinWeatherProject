import { getWeather } from "./weatherOperations.js";
import rainyImg from "./images/rainy.jpg";
import sunnyImg from "./images/sunny.jpg";
import cloudyImg from "./images/cloudy.jpg";

let getWeatherButton = document.querySelector("#get-weather-button");
let convertButton = document.querySelector("#convert");
let currentDay = document.querySelector("#current-weather");
let futureWeatherHeading = document.querySelector("#future-weather-heading");
let entryForm = document.querySelector("#entry-form");

let returnedData;

//event listener on 'Search' button in the html that triggers getWeather and then uses the build functions to fill in the information
getWeatherButton.addEventListener("click", async (e) => {
  let userCityInput = document.querySelector("#city-input-field").value;
  let convertedUserCity = userCityInput.split(" ").join("-");
  //if users entry is at least 3 characters long, run
  if (userCityInput.length > 2) {
    //modal to tell user the application is loading
    loadingModal();
    returnedData = await getWeather(convertedUserCity);
    if (!returnedData.error) {
      //add imperial data lengths to starter values
      for (let i = 0; i < returnedData.days.length; i++) {
        returnedData.days[i].tempmax = String(
          `${returnedData.days[i].tempmax} F°`,
        );
        returnedData.days[i].tempmin = String(
          `${returnedData.days[i].tempmin} F°`,
        );
        returnedData.days[i].temp = String(`${returnedData.days[i].temp} F°`);
        returnedData.days[i].precip = String(
          `${returnedData.days[i].precip} inches`,
        );
        returnedData.days[i].snow = String(
          `${returnedData.days[i].snow} inches`,
        );
        returnedData.days[i].windspeed = String(
          `${returnedData.days[i].windspeed} mph `,
        );
      }
      hideLoadingModal();
      //call function to build current day
      buildToday(returnedData);
      //call the function to fill in the next 7 days weather information (using slice to skip over the current day aka days[0])
      fillNextSeven(returnedData.days.slice(1));
    } else {
      //else if there is an error
      hideLoadingModal();
      //log the return data so i can read the error data
      console.log(returnedData);
      let returnedError = returnedData.error;
      let errorSpan = document.createElement("span");
      errorSpan.textContent = "Bad Input, please try again!";
      errorSpan.id = "error-span";
      errorSpan.style.color = "red";
      entryForm.after(errorSpan);
      setTimeout(() => {
        errorSpan.remove();
      }, 3000);
    }
  }
});

//function that builds content for current/todays weather
function buildToday(weatherData) {
  //wipe any child elements in the current-day eleemnt if there is anything
  while (currentDay.firstChild) {
    currentDay.removeChild(currentDay.firstChild);
  }

  //heading to describe what the user is seeing
  let newCurrentHeading = document.createElement("h2");
  newCurrentHeading.textContent = "Current Weather: ";
  currentDay.appendChild(newCurrentHeading);

  //location
  let currentLocation = document.createElement("h3");
  currentLocation.textContent = `Location: ${weatherData.resolvedAddress}`;
  currentDay.appendChild(currentLocation);

  //date
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
  if (weatherData.days[0].precip > 0) {
    let currentPrecipitationForecast = document.createElement("p");
    currentPrecipitationForecast.id = "current-precipitation-forecast";
    currentPrecipitationForecast.textContent = `Predicted precipitation for day: ${weatherData.days[0].precip}`;
    currentDay.appendChild(currentPrecipitationForecast);
  }
  //humidity level
  let currentHumidity = document.createElement("p");
  currentHumidity.textContent = `Current Humidity: ${weatherData.days[0].humidity}`;
  currentDay.appendChild(currentHumidity);

  //if then snow (>0)  (is that so far or planned?)
  if (weatherData.days[0].snow > 0) {
    let currentSnowForecast = document.createElement("p");
    currentSnowForecast.textContent = `Snow Amount Forecasted: ${weatherData.days[0].snow}`;
    currentDay.appendChild(currentSnowForecast);
  }

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
  currentWind.textContent = `Wind speed & Direction: ${weatherData.days[0].windspeed} towards ${getWindDirection(weatherData.days[0].winddir)}`;
  currentDay.appendChild(currentWind);

  //day conditions
  let currentConditions = document.createElement("p");
  currentConditions.textContent = `Days conditions: ${weatherData.days[0].conditions}`;
  currentDay.appendChild(currentConditions);

  //change background image of currentDay
  let backgroundImage = pickBackgroundImage(weatherData.days[0].icon);
  currentDay.style.background = `no-repeat url(${backgroundImage})`;
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

//function to fill in  the next 7 days of weather information
function fillNextSeven(weatherDaysArr) {
  futureWeatherHeading.style.display = "block";
  //wipe any preexisting data
  for (let i = 1; i < 8; i++) {
    let tempFutureSection = document.querySelector(`#day-${i}`);
    while (tempFutureSection.firstChild) {
      tempFutureSection.removeChild(tempFutureSection.firstChild);
    }
  }

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
    tempLowHigh.textContent = `Temp low: ${weatherDaysArr[i].tempmin} / Temp high: ${weatherDaysArr[i].tempmax}`;
    tempDaySection.appendChild(tempLowHigh);
    //if precipitation then how much is anticipated
    if (weatherDaysArr[i].precip > 0) {
      let temmpPrecipitation = document.createElement("p");
      temmpPrecipitation.textContent = `Precipitation: ${weatherDaysArr[i].precip} inches`;
      tempDaySection.appendChild(temmpPrecipitation);
    }
    //if snow then how much is anticipated
    if (weatherDaysArr[i].snow > 0) {
      let tempSnow = document.createElement("p");
      tempSnow.textContent = `Snow: ${weatherDaysArr[i].snow}`;
      tempDaySection.appendChild(tempSnow);
    }
    //if wind then how fast and in what direction
    if (weatherDaysArr[i].windspeed > 0) {
      let tempWind = document.createElement("p");
      tempWind.textContent = `Wind: ${weatherDaysArr[i].windspeed} ${getWindDirection(weatherDaysArr[i].winddir)}`;
      tempDaySection.appendChild(tempWind);
    }
    //change background image of tempDay
    let backgroundImage = pickBackgroundImage(weatherDaysArr[i].icon);
    tempDaySection.style.background = `no-repeat url(${backgroundImage})`;
    tempDaySection.style.backgroundSize = "cover";
  }
}

//button listener to change Fahrenheit to Celsius, and miles per hour to kilometers per hour for wind readouts
convertButton.addEventListener("click", (e) => {
  //if there is returned data then convert it
  if (returnedData?.resolvedAddress && !returnedData?.error) {
    //if the data is in Imperial, convert it to Metric
    if (returnedData.days[0].temp.split(" ")[1] === "F°") {
      for (let i = 0; i < returnedData.days.length; i++) {
        returnedData.days[i].tempmax = String(
          `${convertToCel(returnedData.days[i].tempmax.split(" ")[0])} C°`,
        );
        returnedData.days[i].tempmin = String(
          `${convertToCel(returnedData.days[i].tempmin.split(" ")[0])} C°`,
        );
        returnedData.days[i].temp = String(
          `${convertToCel(returnedData.days[i].temp.split(" ")[0])} C°`,
        );
        returnedData.days[i].precip = String(
          `${convertInchesToMillimeters(returnedData.days[i].precip.split(" ")[0])} millimeters`,
        );
        returnedData.days[i].snow = String(
          `${convertInchesToMillimeters(returnedData.days[i].snow.split(" "[0]))} millimeters`,
        );
        returnedData.days[i].windspeed = String(
          `${convertMilesToKilometers(returnedData.days[i].windspeed.split(" ")[0])} kmh `,
        );
      }
      //otherwise if the data is in Metric convert it to Imperial
    } else if (returnedData.days[0].temp.split(" ")[1] === "C°") {
      for (let i = 0; i < returnedData.days.length; i++) {
        returnedData.days[i].tempmax = String(
          `${convertToF(returnedData.days[i].tempmax.split(" ")[0])} F°`,
        );
        returnedData.days[i].tempmin = String(
          `${convertToF(returnedData.days[i].tempmin.split(" ")[0])} F°`,
        );
        returnedData.days[i].temp = String(
          `${convertToF(returnedData.days[i].temp.split(" ")[0])} F°`,
        );
        returnedData.days[i].precip = String(
          `${convertMillimetersToInches(returnedData.days[i].precip.split(" ")[0])} inches`,
        );
        returnedData.days[i].snow = String(
          `${convertMillimetersToInches(returnedData.days[i].snow.split(" "[0]))} inches`,
        );
        //^will have to pass in the first value of the split of this and convert to number for the if statement, likewise for rain
        returnedData.days[i].windspeed = String(
          `${convertKilometersToMiles(returnedData.days[i].windspeed.split(" ")[0])} mph `,
        );
      }
    }
    //triggers below functions
    buildToday(returnedData);
    fillNextSeven(returnedData.days.slice(1));
  }
  //otherwise do nothing and let them click the button repeatedly
});

function convertToCel(tempF) {
  return ((tempF - 32) * (5 / 9)).toFixed(2);
}
function convertToF(tempC) {
  return (tempC * 1.8 + 32).toFixed(2);
}
function convertMilesToKilometers(miles) {
  return (miles * 1.609344).toFixed(2);
}
function convertKilometersToMiles(kilometers) {
  return (kilometers * 0.6213711922).toFixed(2);
}
function convertInchesToMillimeters(inches) {
  return (inches * 25.4).toFixed(2);
}
function convertMillimetersToInches(millimeters) {
  return (millimeters / 25.4).toFixed(2);
}

//loading modal /animation while request is processing
function loadingModal() {
  let loadingModal = document.createElement("div");
  let loadingContent = document.createElement("p");
  loadingContent.id = "loading-content";
  loadingContent.textContent = "LOADING...";
  loadingModal.appendChild(loadingContent);
  loadingModal.id = "loading-modal";
  document.querySelector("body").appendChild(loadingModal);
}
function hideLoadingModal() {
  document.querySelector("#loading-modal").remove();
}

//ok error showing up, however thats whenever there is an error at all, I'd like to be able to dwindle down when an input doesn't yield a result vs our app is out of api requests or the api is down, etc

//can i use what i have for when returnedData.error === SyntaxError?
//and add another message when returnedData.error === different values?

//so i tried to use the response's error property, which returned another object, that had a message property with a specific value when i typed in a bad location to output the input error message to the user however it doesn't execute the code and throws the error into the console because I think from unhandledRejectionError default behavior
