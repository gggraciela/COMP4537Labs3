module.exports = {
  getDate: () => {
    const date = new Date();
    
    // Get the day, month, date, year, and time in the desired format
    const day = date.toLocaleString('en-US', { weekday: 'short' }); // Abbreviated weekday (e.g., "Wed")
    const month = date.toLocaleString('en-US', { month: 'short' }); // Abbreviated month (e.g., "Sept")
    const dayOfMonth = date.getDate(); // Day of the month (e.g., "1")
    const year = date.getFullYear(); // Full year (e.g., "2023")
    const time = date.toLocaleTimeString(); // Time (e.g., "12:52:14")

    // Calculate the offset in minutes, then convert to hours
    const timeZoneOffset = date.getTimezoneOffset() / 60; // Offset in hours (positive is east of GMT, negative is west)

    // Format the offset to match the desired format (e.g., "GMT-0800" or "GMT-0700" depending on DST)
    const formattedOffset = `GMT${timeZoneOffset <= 0 ? '+' : ''}${timeZoneOffset < 10 && timeZoneOffset > -10 ? '0' : ''}${timeZoneOffset}00`;

    // Get the time zone abbreviation (e.g., "Pacific Standard Time")
    const timeZone = date.toString().match(/\((.*)\)/)[1];

    // Return the formatted string as requested
    return `${day} ${month} ${dayOfMonth < 10 ? '0' : ''}${dayOfMonth} ${year} ${time} ${formattedOffset} (${timeZone})`;
  }
};
