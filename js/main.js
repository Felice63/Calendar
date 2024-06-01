// Get the current date and time
const now = new Date();

// Get the HTML element with id="month"
const monthAndYear = document.querySelector(`#month`);

// Function to get number of days in a month
function numDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

// Function to update calendar
function updateCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  // Update month and year
  monthAndYear.innerHTML = date.toLocaleDateString(`en-US`, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Update day 31, 29, 28 visibility for leap year
  const btnThirtyOne = document.querySelector("#dayThirtyOne");
  const btnThirty = document.querySelector("#dayThirty");
  const btnTwentyNine = document.querySelector("#dayTwentyNine");
  const btnTwentyEight = document.querySelector("#dayTwentyEight");
  if (numDaysInMonth(year, month + 1) === 31) {
    btnThirtyOne.innerHTML =`<span>31</span>`;
    btnThirtyOne.style.display = `flex`;
  } else if (numDaysInMonth(year, month + 1) === 29) {
    btnThirtyOne.style.display = `none`;
    btnThirty.style.display = `none`;
    btnTwentyNine.style.display = `flex`;
  } else if (numDaysInMonth(year, month + 1) === 28) {
    btnThirtyOne.style.display = `none`;
    btnThirty.style.display = `none`;
    btnTwentyNine.style.display = `none`;
    btnTwentyEight.style.display = `flex`;
  } else {
    btnThirtyOne.style.display = `none`;
  }

  // Update grid column for day one
  const firstDayName = new Date(year, month, 1);
  const monthStart = document.querySelector(`#dayOne`);
  monthStart.style = `grid-column: ${firstDayName.getDay() + 1};`;

  // Highlight current day
  const dayNumber = document.querySelectorAll(`div > span`);
  dayNumber.forEach((el) => {
    if (parseInt(el.textContent, 10) === day) {
      el.parentElement.classList.add(`bgColorOn`);
    } else {
      el.parentElement.classList.remove(`bgColorOn`);
    }
  });
}

// Update calendar on load
updateCalendar(now);

// Add event listener for date submit
const submitDate = document.querySelector(`#submitDate`);
submitDate.addEventListener(`click`, () => {
  const dateInputvalue = document.querySelector(`#dateInputField`).value;
  const newDate = new Date(dateInputvalue);
  updateCalendar(newDate);
});
