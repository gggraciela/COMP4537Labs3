const moment = require('moment-timezone');

module.exports = {
  getDate: () => {
    const date = moment.tz("America/Los_Angeles"); // Use the Pacific Time Zone

    // Get the day, month, date, year, and time in the desired format
    const day = date.format('ddd'); // Abbreviated weekday (e.g., "Wed")
    const month = date.format('MMM'); // Abbreviated month (e.g., "Sept")
    const dayOfMonth = date.format('DD'); // Day of the month (e.g., "01")
    const year = date.format('YYYY'); // Full year (e.g., "2023")
    const time = date.format('hh:mm:ss A'); // Time (e.g., "12:52:14 PM")

    // Get the time zone offset and convert it to the format GMT-0800
    const timeZoneOffset = date.utcOffset() / 60; // Offset in hours
    const formattedOffset = `GMT${timeZoneOffset < 0 ? '-' : '+'}${Math.abs(timeZoneOffset) < 10 ? '0' : ''}${Math.abs(timeZoneOffset)}00`;

    // Get the time zone abbreviation (e.g., "PST")
    const timeZone = date.format('z');

    // Return the formatted string as requested
    return `${day} ${month} ${dayOfMonth} ${year} ${time} ${formattedOffset} (${timeZone})`;
  }
};
