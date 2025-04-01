import { dateOperations } from "./dateOperations.js";
//function to return current weather and next 7 days
async function getWeather(city) {
  try {
    let todaysDate = dateOperations.todayDateString;
    let dateInSevenDays = dateOperations.sevenDaysFromToday;
    //query for todays weather and the next 7 days
    let resultPromise = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${todaysDate}/${dateInSevenDays}?key=${process.env.API_KEY}`,
      { mode: "cors" },
    );
    //convert response to json from promise
    let convertedData = await resultPromise.json();
    //return that converted data
    return convertedData;
  } catch (err) {
    console.log(err);
  }
}

export { getWeather };
