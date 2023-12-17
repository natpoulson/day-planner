// Callback to update the current time shown on the page
function renderTime() {
  $('#currentDay').text(dayjs().format('dddd, YYYY-MM-DD HH:mm'));
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