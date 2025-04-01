export const dateOperations = (function () {
  let today = new Date();
  //getMonth returns a zero based count for the month, the other 2 methods don't work that way...
  let todayDateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

  let sevenDaysFromToday = addSevenDays(todayDateString);

  function addSevenDays(date) {
    //date argument is a date string in the format yyyy-mm-dd
    //create an array of element from the argument date string
    let currentDateArray = date.split("-");
    //it's elements are strings, we need to change them to Numbers so we can manipulate them accordingly; strings will concatenate numbers as other strings
    let currentDateYear = Number(currentDateArray[0]);
    let currentDateMonth = Number(currentDateArray[1]);
    let currentDateDay = Number(currentDateArray[2]);

    let isLeapYear = checkForLeap(currentDateYear);

    //check if adding 7 days to the current date will remain in the same month, if so return that new date, otherwise calculate new month and potentially year
    if (currentDateDay + 7 < daysInMonth(currentDateMonth)) {
      currentDateDay += 7;
      return `${currentDateYear}-${currentDateMonth}-${currentDateDay}`;
    } else {
      //variable to hold the amount of days we need to add, and this variable will be changed as a chunk of days are added into current month and then into next month after flipping to the next month
      let daysLeftInMonth =
        daysInMonth(currentDateMonth, isLeapYear) - currentDateDay;
      //we know already that we're going to have to increment month
      //but what happens if incrementing that month means a new year, well we'll have to write some more conditionals, and might as well make variables for a new date
      //and set the future day to be how many days remain after taking the days in the current month - the current date and then removing days until that month is fulfilled
      let futureYear = currentDateYear;
      let futureMonth;
      let futureDay = 7 - daysLeftInMonth;
      //increment month first, and then check whether that changes the year,
      //if so increment year and change month to january
      if (currentDateMonth + 1 === 13) {
        futureMonth = 1;
        futureYear = currentDateYear + 1;
        return `${futureYear}-${futureMonth}-${futureDay}`;
      } else {
        futureMonth = currentDateMonth + 1;
        return `${futureYear}-${futureMonth}-${futureDay}`;
      }
    }
  }

  function checkForLeap(year) {
    if (year % 400 === 0 || (year % 4 === 0 && year % 100 != 0)) {
      //only looks for centuries divisible by 400
      // or non century years that are divisible by 4
      return true;
    } else {
      return false;
    }
  }

  function daysInMonth(month, leap) {
    let daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (leap && month - 1 === 1) {
      return 29;
    } else if (!leap && month - 1 === 1) {
      return 28;
    } else {
      return daysInMonth[month - 1];
    }
  }
  return { todayDateString, sevenDaysFromToday };
})();
