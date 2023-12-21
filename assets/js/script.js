// Class for individual blocks of time
class Timeblock {
  // Static properties
  static config = {
    earliest: 9,
    latest: 17
  };

  // Instance properties
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

  // Getters
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
    // Obtain the current hour
    const currentHour = dayjs().hour();

    // Identify if in past, present, or future, then return the applicable timeframe.
    // This will then be used to apply the corresponding class on the Timeblock
    if (currentHour < this.hour) {
      return 'future';
    }
    if (currentHour === this.hour) {
      return 'present';
    }
    if (currentHour > this.hour) {
      return 'past';
    }
  }

  // Class constructor
  constructor(hour, description = "") {
    try {
      // Ensure the hour paramater is a number
      if (typeof hour !== 'number') {
        throw "The hour passed wasn't a number.";
      }
      // Ensure the parameter is within the configured boundaries
      if (hour < Timeblock.config.earliest || hour > Timeblock.config.latest) {
        throw `The hour passed is outside defined bounds.
        Expected: Earliest: ${Timeblock.config.earliest}, Latest: ${Timeblock.config.latest}.
        Received: ${hour}.`;
      }

    } catch (err) {
      // Generate an error explaining why the object couldn't be created
      console.error("Unable to create the Timeblock: ", err);
      return undefined;
    }

    // Resolve the parameters
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
    localStorage.setItem("day-planner-calendar", JSON.stringify(Calendar.blocks));
  }

  static update(event) {
    // Prevent caller from bubbling up further
    event.stopPropagation();

    // Obtain the ID of the parent node
    const parentID = event.currentTarget.parentNode.id;

    // Get the the block that corresponds to the hour
    const target = Calendar.blocks.find(a => {
      return `hour-${a.hour}` === parentID;
    });

    // Extract the text entered from the textarea
    const sourceText = $(`#hour-${target.hour}`).children('textarea').val();
    
    // Update the description for that element
    target.description = sourceText;

    // Save the current structure to localStorage
    Calendar.save();
  }

  static render(delta = false) {
    // Define the container for the rendering logic
    const calendarEl = $('#calendar');

    for (const item of Calendar.blocks) {
      // Check if there are already children in the DOM that can be manipulated instead of generating a fresh batch
      if (calendarEl.children().is(`#hour-${item.hour}`)) {
        const target = $(`#hour-${item.hour}`);

        // Remove any existing classes for timeframe, then add the current one
        target.removeClass(['past', 'present', 'future']).addClass(item.timeframe);
        if (!delta) {
          // Add formatted time to block
          target.children('.hour').text(item.hour.formatted);
          // Add any events if specified
          target.children('textarea').val(item.description);
        }
      } else {
        // Propagate the container with all time blocks
        calendarEl.append(item.template);
      }
    }
  }
}

// Callback to update the current time shown on the page
function renderTime() {
  // Invokes delta render so that only the timeframe updates
  Calendar.render(true);
  $('#currentDay').text(dayjs().format('dddd | YYYY-MM-DD | hh:mm a'));
}

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Initialisers
  // Generate a fresh set of data
  Calendar.init();
  // Replace if there's data in localstorage
  Calendar.load();
  // Commit the structure to localstorage (only really applicable to fresh loads)
  Calendar.save();

  // Event listener for save buttons
  $('#calendar').on("click", "button", Calendar.update);

  // First meaningful render of time and timeframe status, initialise timer
  renderTime();
  setInterval(renderTime, 1000);
});