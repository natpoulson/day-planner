// Callback to update the current time shown on the page
function renderTime() {
  $('#currentDay').text(dayjs().format('dddd, YYYY-MM-DD HH:mm'));
}

class Calendar {
  // This is the working set for the 
  static set = [];

  static init() {
    // Clear the set if not already done
    Calendar.set = [];

    // Generate a clean batch of Timeblocks
    for (let i = Timeblock.default.earliest; i <= Timeblock.default.latest; i++) {
      Calendar.set.push(new Timeblock(i));
    }
  }

  static load() {
    // Check if there is anything in localStorage
    if (typeof localStorage.getItem("day-planner-calendar") !== null) {
      // Parse the localStorage and generate Timeblocks
      for (const item of (JSON.parse(localStorage.getItem("day-planner-calendar")))) {
        Calendar.set.push(new Timeblock(item.hour.actual, item.description));
      }
      return;
    }

    // If the above check failed, then that means we need a fresh calendar. Call init.
    Calendar.init();
  }

  static save() {
    // Package the current calendar in localStorage
    localStorage.setItem("day-planner-calendar", JSON.stringify(Calendar.set));
  }
}

// WHEN I scroll down
// THEN I am presented with timeblocks for standard business hours of 9am - 5pm
// WHEN I view the timeblocks for that day
// THEN each timeblock is color coded to indicate whether it is in the past, present, or future
/*
  Factory function - Create Time Block
    Generate Template Literal string of prefab block, populate with:
    - Time
    - Any existing events from storage
    - Assign classes relativ to current time

    Would this be better as a class? I think so.
      - Define the base template as a static property
      - Class instances can store
        - Designated timeframe
        - State
        - Event text (if any)
        - Methods for
          - Clearing
          - Updating ( proc this on timer )
*/
class Timeblock {
  static default = {
    earliest: 9,
    latest: 17
  };

  hour = {
    actual: Timeblock.default.earliest,
    formatted: () => {
      if (hour.actual > 12) {
        // Return hours later than 12:00 in 12-hour notation
        return `${hour.actual - 12} PM`;
      }
      if (hour.actual === 12) {
        // Return as-is (since otherwise it would become 0 PM)
        return `${hour.actual} PM`;
      }
      // Fallthrough default
      return `${hour.actual} AM`;
    }
  };
  description = "";
  // Template literal that is used to present the timeblock within the DOM
  template = `<div id="hour-${this.hour.actual}" class="row time-block ${this.timeframe}">
  <div class="col-2 col-md-1 hour text-center py-3">${this.hour.formatted}</div>
  <textarea class="col-8 col-md-10 description" rows="3">${this.description}</textarea>
  <button class="btn saveBtn col-2 col-md-1" aria-label="save">
    <i class="fas fa-save" aria-hidden="true"></i>
  </button>
</div>`;

  get timeframe() {
    const currentHour = dayjs.hour();
    if (this.hour.actual > currentHour) {
      return 'Future';
    }
    if (this.hour.actual === currentHour) {
      return 'Present';
    }
    if (this.hour.actual < currentHour) {
      return 'Past';
    }

    return null;
  }

  constructor(hour, description = "") {
    try {
      if (typeof hour !== 'number') {
        throw "The hour passed wasn't a number.";
      }
      if (hour < Timeblock.default.earliest || hour > Timeblock.default.latest) {
        throw `The hour passed is outside defined bounds.
        Expected: Earliest: ${Timeblock.default.earliest}, Latest: ${Timeblock.default.latest}.
        Received: ${hour}.`;
      }

    } catch (err) {
      console.error("Unable to create the Timeblock: ", err);
      return undefined;
    }
    this.hour.actual = hour;
    this.description = description;
  }

  // TODO - Save method
}

// WHEN I click into a timeblock
// THEN I can enter an event
//  This could just be a setter on the time block class

// WHEN I click the save button for that timeblock
// THEN the text for that event is saved in local storage
//  This can be part of the event class

// WHEN I refresh the page
// THEN the saved events persist

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
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
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  /*
  // TODO: Add code to display the current date in the header of the page.
    setInterval(clock update, 1000)
  */
 renderTime();
 setInterval(renderTime, 1000);
});