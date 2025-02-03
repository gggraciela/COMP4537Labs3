module.exports = {
  getDate: () => new Date().toUTCString()  // Use UTC time to avoid time zone issues
};
