const path = require("path");
const express = require("express");
const { appendFile } = require("fs");
const cors = require("cors");
const app = express();

const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

const corsOptions = require("./config/corsOptions");
const handleError = require("./controllers/errorController");
const { verify } = require("crypto");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3500;

// custom middleware logger.
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middlewaer to handle urlencoded data
// in other words form data.
// content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// built-in middleware to handle json data
// content-type: application/json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// serve static files
app.use(express.static(path.join(__dirname, "public")));
// serve static files aswell to the subdir

app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

// protected routes
app.use(verifyJWT);

app.use("/employees", require("./routes/api/employees"));

app.get("/*", handleError);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
