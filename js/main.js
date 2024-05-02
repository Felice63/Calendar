// NOTE:------------------------------
// 86400000 Milliseconds = 24 Hours
// 3600000 ms = 1 hr
// -----------------------------------

// Make the Button 31 variable to control whether a month having 31 days instead of 30 will display. This will be called in the conditional embedded in th callback
const btnThirtyOne = document.querySelector("#dayThirtyOne");

// Get the HTML element with ID of month
let monthAndYear = document.querySelector(`#month`);

// Initiate the inputDate Field's submit button
const submitDate = document.querySelector(`#submitDate`)

// Add an event listener with click event and callback parameters
submitDate.addEventListener(`click`, showDate);

// NOTE That function declarations are hoisted so I can activate the callback function above the month names array

function showDate() {

  // Get the input element by its id and store its value
  let dateInputvalue = document.querySelector(`#dateInputField`).value;
  console.log(dateInputvalue, typeof(dateInputvalue))

  // Create a new Date object from the stored input value
  let dateInput = new Date(dateInputvalue);
  console.log(dateInput, typeof(dateInput))

  // Format the date as "March 12 2024"
  let formattedDate = `${dateInput.toLocaleDateString('en-US', { month: 'long' })} ${dateInput.getDate()} ${dateInput.getFullYear()}`;

  console.log(`${formattedDate} is the date, and it is a ${typeof(formattedDate)}`);

  
  monthAndYear.innerHTML = `${formattedDate}`

  // GET the CURRENT MONTH NUMBER
  // Add 1 because January is month number 0
  // We need the .getMonth() + 1 method so that the month and starting day will be correct
  let currentMonthNum = dateInput.getMonth();
  console.log(currentMonthNum, dateInput.getDate())

  // Get the current month relative to the array, calling its index number and value. Using the dateInput varialble here
  let currentMonth = months[dateInput.getMonth()];
  console.log(currentMonth)

  let currentYear = dateInput.getFullYear();
  console.log(currentYear)

  // Get the element with id="numOfDays"
  let numOfDays = document.querySelector(`#numOfDays`);

  numOfDays.innerHTML = ` - has ${numDaysInMonth(
    currentYear,
    currentMonthNum
  )} Days`;

  // Create a conditional to detect the number of days in the current month, then append the extra day (day 31) to the calendar, the default being 30 days. The variable is in global scope at the top of the script.

  if (numDaysInMonth(currentYear, currentMonthNum) === 30) {
    btnThirtyOne.innerHTML =`<time datetime="${dateInput}">31</time>`;
    // btnThirtyOne.style.backgroundColor = `#f0f0f0;`;
  } else {
    btnThirtyOne.innerHTML =`<time datetime="${dateInput}"></time>`;
    // btnThirtyOne.style.backgroundColor = `white`;
  };

// Set up the CSS grid to switch over to the column respresented dependent on the First day of the month; ie Sunday = 1, Monday = 2, etc. Need to set the start day of the month and add the grid-column class to the index of the month's start day, plus 1

  const firstDayName = new Date(dateInput.getFullYear(), dateInput.getMonth(), 1);

  const monthStart = document.querySelector(`#dayOne`);

  monthStart.style = `grid-column: ${firstDayName.getDay()};`;

  console.log(
    `${currentMonth} 1, ${currentYear} is a ${
      daysOfTheWeek[firstDayName.getDay()]
    }`
  );

  const dayNumber = document.querySelectorAll(`button > span`);

  dayNumber.forEach((el) => {
    // console.log(el.textContent, typeof(el.textContent));

    if(el.textContent == dateInput.getDate()) {
      console.log(el.textContent == dateInput.getDate(), `${el.textContent}, ${dateInput.getDate()}, ${el}, ${dayNumber}`);
      // el.parentElement.classList.toggle(`toggleBG`);
      if(!el.parentElement.classList.contains(`bgColorOn`)) {
        el.parentElement.classList.add(`bgColorOn`);
      }
    } else {
      // console.log(false)
      el.parentElement.classList.remove(`bgColorOn`);
    }
  });


}

// The array of month names below, are strings because it's more efficient to work this way, picking up the month names as array values instead of relying on JS to stringify month names from the Date() object.This applied to the days of the week array as well.

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// The days of the week as an array of strings
const daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// The function below parses the number of days in the specified month. It will be called dependent on the month selected from the stored dateInput value, inside the "showDate" callback above. The parameters `year`, and `month`, will be substituted with `MonthYear` and `monthNum` and as arguments

function numDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

// For an explanation about Date() parameters
// SEE: https://www.tutorialsteacher.com/javascript/javascript-date

// ---------- Get the current day and add a background style to its box to highlight it