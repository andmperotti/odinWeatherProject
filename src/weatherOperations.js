//function to return current weather and next 7 days
async function getWeather(city) {
  return await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${process.env.API_KEY}`,
  );
}
//function that builds content for current/todays weather
function buildToday(todaysWeather) {}
//function to build future days

//function to build future days for all the future days we received

//event listener on 'Search' button in the html that triggers getWeather and then uses the build functions to fill in the information

//error reporting functionality for when users try to enter invalid data to the input field

export { getWeather };
