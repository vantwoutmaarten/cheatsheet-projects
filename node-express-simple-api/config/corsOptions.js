// third-party middleware to handle cors, cross-origin resource sharing
const whitelist = [
  "http://localhost:3000",
  "http://localhost:3500",
  "www.example.com",
];
const corsOptions = {
  origin: function (origin, callback) {
    // the !origin is only for development.
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
