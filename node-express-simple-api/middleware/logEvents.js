const { format } = require("date-fns");

const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");

const logEvents = async (message, logName) => {
  const dateTime = format(new Date(), "yyyyMMyyyy\thh:mm:ss");
  const uuid = uuidv4();
  const logMessage = `${dateTime}\t${uuid}\t${message}\n`;
  console.log(logMessage);
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logMessage
    );
  } catch (error) {
    console.error(error);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  console.log("Request URL: ", req.url);
  console.log("Request Method: ", req.method);
  next();
};
module.exports = { logEvents, logger };
