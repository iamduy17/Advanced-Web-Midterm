exports.API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_BACKEND_URL
    : "https://advanced-web-midterm-be.onrender.com/";
exports.GOOGLE_ID =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_GOOGLE_CLIENT_ID
    : "730420771553-tis84uscd2klsv8afvvesed9vmft7uqi.apps.googleusercontent.com";
