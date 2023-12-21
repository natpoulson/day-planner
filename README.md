# Day Planner
## Description
This app is an exercise carried out as part of the University of Sydney and edX Coding Bootcamp curriculum. It's a single-page app that allows you to:
- See the current day, date, and time
- See what hours are in the past, present, or future
- View previously saved scheduled items
- Change the text and save events to the browser

This app touched on the use of third party APIs, notably jQuery (Bootstrap is also used, but primarily for the styling of HTML already present).

Skills leveraged in this app include:
- Initialising timers and event listeners
- DOM manipulation using jQuery
- Handling application logic using Classes (while not required for this challenge, it was fun to work in this manner)
- Retrieving and saving data to the browser's local storage for data persistence

## Preview
A screenshot of the app on first time use

![A screenshot of part of the app from the first time loaded](./project/preview-001.png)

A screenshot of the app demonstrating data being held in local storage

![A screenshot of the app with a populated event, and its corresponding object reference in local storage](./project/preview-002.png)

## Usage
This page has the following features
### Real-time clock and timeframe styling
The clock presents the current time at the top of the page. You can test manipulation of the time by adjusting the system clock, or - more easily - by adjusting the location Sensor data using Developer Tools.

When the time changes, the page will almost immediately update to reflect both the time on the clock, and with the relative styling on the scheduler.
### Event entry
If you type in any regular text into the coloured text fields next to the hour indicators. The changes you make here won't be saved unless you click the blue save button next to the event.

You can try this by typing then abruptly reloading the page. You'll see that what you typed is missing.
### Data persistence between reloads
If you happen to save the time block after typing in some text, it will be automatically saved to local storage in your browser. When you reload the page, you'll note that the text doesn't go away, as it persists between sessions.

If you change the text and reload, you'll find it reverts to the previous text.

## Credits
- Starter code (`index.html`, `style.css`, `script.js`) provided by University of Sydney and edX as part of the Online Coding Bootcamp
- Utility code for various site functionality by [jQuery](https://jquery.com/)
- Layout and some element styling by [Bootstrap](https://getbootstrap.com/)
- Date/time formatting and handling by [Day.js](https://day.js.org)

## License
- This project is licensed under the [MIT License](./LICENSE)
- Bootstrap licensed by the Bootstrap Authors under the [MIT License](https://github.com/twbs/bootstrap/blob/main/LICENSE)
- jQuery licensed by the jQuery Foundation under the [MIT License](https://jquery.com/license/)
- day.js licensed by iamjun under the [MIT License](https://github.com/iamkun/dayjs/blob/dev/LICENSE)