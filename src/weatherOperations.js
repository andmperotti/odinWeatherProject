import { dateOperations } from "./dateOperations.js";
//function to return current weather and next 7 days
async function getWeather(city) {
  try {
    let todaysDate = dateOperations.todayDateString;
    let dateInSevenDay = dateOperations.sevenDaysFromToday;
    //query for todays weather and the next 7 days
    let resultPromise = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${todaysDate}/${dateInSevenDay}?key=${process.env.API_KEY}`,
      { mode: "cors" },
    );
    //convert response to json from promise
    let convertedData = await resultPromise.json();
    //temporarily log data for now
    return convertedData
  } catch (err) {
    console.log(err);
  }
}

export { getWeather };
