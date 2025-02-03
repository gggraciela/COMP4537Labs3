module.exports = {
  getDate: () => {
    const date = new Date();
    
    // Get the day, month, date, year, and time in the desired format
    const day = date.toLocaleString('en-US', { weekday: 'short' }); // Abbreviated weekday (e.g., "Wed")
    const month = date.toLocaleString('en-US', { month: 'short' }); // Abbreviated month (e.g., "Sept")
    const dayOfMonth = date.getDate(); // Day of the month (e.g., "1")
    const year = date.getFullYear(); // Full year (e.g., "2023")
    const time = date.toLocaleTimeString(); // Time (e.g., "12:52:14")
    const timeZoneOffset = -date.getTimezoneOffset() / 60; // GMT offset (e.g., "-08")
    const timeZone = date.toString().match(/\((.*)\)/)[1]; // Extracts the time zone abbreviation (e.g., "Pacific Standard Time")
    
    // Return the formatted string as requested
    return `${day} ${month} ${dayOfMonth < 10 ? '0' : ''}${dayOfMonth} ${year} ${time} GMT${timeZoneOffset < 0 ? timeZoneOffset : `+${timeZoneOffset}`}00 (${timeZone})`;
  }
};
