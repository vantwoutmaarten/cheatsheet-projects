const { logEvents } = require("./logEvents");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  logEvents(`${err.name}\t${err.message}`, "errorLog.txt");
  res.status(500).send("Something broke!");
};

module.exports = errorHandler;
