
class Timeblock {
  static config = {
    earliest: 9,
    latest: 17
  };

  hour = Timeblock.config.earliest;
  description = "";

  // Template literal that is used to present the timeblock within the DOM
  get template() {
    return `<div id="hour-${this.hour}" class="row time-block ${this.timeframe}">
    <div class="col-2 col-md-1 hour text-center py-3">${this.formattedHour}</div>
    <textarea class="col-8 col-md-10 description" rows="3">${this.description}</textarea>
    <button class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
    </button>
  </div>`;
  };

  get formattedHour() {
    if (this.hour > 12) {
      // Return hours later than 12:00 in 12-hour notation
      return `${this.hour - 12} PM`;
    }
    if (this.hour === 12) {
      // Return as-is (since otherwise it would become 0 PM)
      return `${this.hour} PM`;
    }
    // Fallthrough config
    return `${this.hour} AM`;
  }

  get timeframe() {
    const currentHour = dayjs().hour;
    if (this.hour > currentHour) {
      return 'future';
    }
    if (this.hour === currentHour) {
      return 'present';
    }
    if (this.hour < currentHour) {
      return 'past';
    }

    return null;
  }

  constructor(hour, description = "") {
    try {
      if (typeof hour !== 'number') {
        throw "The hour passed wasn't a number.";
      }
      if (hour < Timeblock.config.earliest || hour > Timeblock.config.latest) {
        throw `The hour passed is outside defined bounds.
        Expected: Earliest: ${Timeblock.config.earliest}, Latest: ${Timeblock.config.latest}.
        Received: ${hour}.`;
      }

    } catch (err) {
      console.error("Unable to create the Timeblock: ", err);
      return undefined;
    }
    this.hour = hour;
    this.description = description;
  }
}

class Calendar {
  // This is the working set for the calendar
  static blocks = [];

  static init() {
    // Clear the blocks
    Calendar.blocks = [];

    // Generate a clean batch of Timeblocks
    for (let i = Timeblock.config.earliest; i <= Timeblock.config.latest; i++) {
      Calendar.blocks.push(new Timeblock(i));
    }
  }

  static load() {
    // Check if there is anything in localStorage as well
    if (localStorage.getItem("day-planner-calendar")) {
      // Clear the blocks
      Calendar.blocks = [];
      // Parse the localStorage and generate Timeblocks
      for (const item of JSON.parse(localStorage.getItem("day-planner-calendar"))) {
        // Populate the calendar with every block from the localStorage
        Calendar.blocks.push(new Timeblock(item.hour, item.description));
      }
    }
    // Render the updated set
    Calendar.render();
  }

  static save() {
    // Package the current calendar in localStorage
    localStorage.setItem("day-planner-calendar", JSON.stringify(Calendar.blocks, ["hour", "description"]));
  }

  static render() {
    const calendarEl = $('#calendar');
    for (const item of Calendar.blocks) {
      if (calendarEl.children().is(`#hour-${item.hour}`)) {
        const target = $(`#hour-${item.hour}`);
        target.children('.hour').text(item.hour.formatted);
        target.children('textarea').val(item.description);
      } else {
        calendarEl.append(item.template);
      }
    }
  }
}

// Callback to update the current time shown on the page
function renderTime() {
  $('#currentDay').text(dayjs().format('dddd, YYYY-MM-DD HH:mm'));
}

// WHEN I click into a timeblock
// THEN I can enter an event
//  This could just be a blockster on the time block class

// WHEN I click the save button for that timeblock
// THEN the text for that event is saved in local storage
//  This can be part of the event code below

// WHEN I refresh the page
// THEN the saved events persist

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Initialisers
  Calendar.init();
  Calendar.load();
  Calendar.save();
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and sets
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  /*
  // TODO: Add code to display the current date in the header of the page.
    setInterval(clock update, 1000)
  */
  renderTime();
  setInterval(renderTime, 1000);
});