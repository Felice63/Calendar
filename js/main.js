// NOTE:------------------------------
// 86400000 Milliseconds = 24 Hours
// 3600000 ms = 1 hr
// -----------------------------------

// Get the current date and time
let now = new Date();

// Get the HTML element with id="month" and assign it to the monthAndYear variable
let monthAndYear = document.querySelector(`#month`);

// Set innerHTML on monthAndYear to the current date now
// This will appear at the top of the calendar inside the section with class="calendarTop"
// The toLocaleDateString() method returns a string with a language sensitive representation of the date portion of this date
monthAndYear.innerHTML = now.toLocaleDateString(`en-US`, {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

// The function below parses the number of days in the specified month. It will be called dependent on the month selected from the stored now variable. The parameters `year`, and `month`, will be substituted with `MonthYear` and `monthNum` and as arguments

function numDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

// GET the CURRENT YEAR
let currentYear = now.getFullYear();

// GET the CURRENT MONTH NUMBER
// Add 1 because January is month number 0
// We need the .getMonth() + 1 method so that the month and starting day will be correct
let currentMonthNum = now.getMonth()+1;
console.log(`The current month number is ${currentMonthNum}, the current day number is ${now.getDate()}`)

// The btnThirtyOn variable will control whether a month having 31 days instead of 30 will display. This will be called in the conditional below
const btnThirtyOne = document.querySelector("#dayThirtyOne");

// Create a conditional to detect the number of days in the current month, then append the extra day (day 31) to the calendar, the default being 30 days. The variable is in global scope at the top of the script.

if (numDaysInMonth(currentYear, currentMonthNum) === 31) {
    btnThirtyOne.innerHTML =`<time datetime="${now}">31</time>`;
    btnThirtyOne.style.display = `flex`;
  } else {
    btnThirtyOne.style.display = `none`;
};

// Set up the CSS grid to switch over to the column respresented dependent on the First day of the month; ie Sunday = 1, Monday = 2, etc. Need to set the start day of the month and add the grid-column class to the index of the month's start day, plus 1

let firstDayName = new Date(now.getFullYear(), now.getMonth(), 1);

let monthStart = document.querySelector(`#dayOne`);

monthStart.style = `grid-column: ${firstDayName.getDay()+1};`;

// Get the current day and add a background style to its box to highlight it
let dayNumber = document.querySelectorAll(`button > span`);

dayNumber.forEach((el) => {

  if(el.textContent == now.getDate()) {

    if(!el.parentElement.classList.contains(`bgColorOn`)) {
       el.parentElement.classList.add(`bgColorOn`);
    }
  } else {
    el.parentElement.classList.remove(`bgColorOn`);
  }
});

/* ******* START SUBMIT BUTTON ********** */

// Get the value of the date input field, assign it to a variable. Create an event listener for the form to listen for the submit event, then prevent the default action of the form. This will prevent the page from reloading when the form is submitted.

// Initiate the inputDate Field's submit button
const submitDate = document.querySelector(`#submitDate`)

// Add an event listener with click event and callback parameters
submitDate.addEventListener(`click`, showDate);

// Create a function to show the date
function showDate() {
  // Get the input element by its id and store its value
  let dateInputvalue = document.querySelector(`#dateInputField`).value;

  // Reassign the now variable to the dateInputvalue
  now = new Date(dateInputvalue);
  
  monthAndYear.innerHTML = now.toLocaleDateString(`en-US`, {  
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // we can use the new Date(dateInputvalue) to get the chosen month and year and use the numDaysInMonth function as a callback to get the number of days in that month

  if (numDaysInMonth(now.getFullYear(), now.getMonth()+1) === 31) {
    btnThirtyOne.innerHTML =`<time datetime="${now}">31</time>`;
    btnThirtyOne.style.display = `flex`;
  } else {
    btnThirtyOne.style.display = `none`;
};

// Reassign the firstDayName variable to the new dateInputvalue
firstDayName = new Date(now.getFullYear(), now.getMonth(), 1);

// Reassign the monthStart variable to the new dateInputvalue

monthStart = document.querySelector(`#dayOne`);

monthStart.style = `grid-column: ${firstDayName.getDay()+1};`;

// Get the chosen day and add a background style to its box to highlight it
dayNumber.forEach((el) => {

  if(el.textContent == now.getDate()) {

    if(!el.parentElement.classList.contains(`bgColorOn`)) {
       el.parentElement.classList.add(`bgColorOn`);
    }
  } else {
    el.parentElement.classList.remove(`bgColorOn`);
  }
});

  return

} // End of showDate function
