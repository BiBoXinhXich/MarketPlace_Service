/**
 * dotenv Config
 */
require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRoute = require("./routes");
const apiRoute = require("./routes");
const authRoute = require("./routes/auth.route");
const { initDatabase } = require("./configs");
// require("./models");

const app = express();
// region setup
// cookie signed tạo ký số cho cookie từ env
app.use(cookieParser(process.env.SECRET_KEY));
// ghi log lại trên command
app.use(logger("dev"));
// Cross-Origin Resource Sharing (CORS) Enable
app.use(cors());
// disbled headers power by server
app.disable("x-powered-by");
// body parser parse JSON String, URL Encoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// set up public folder
app.use("/public", express.static(path.join(__dirname, "public")));
//endregion
//region init database
initDatabase();
//endregion

//region setup routes
app.use("/", indexRoute);

app.get("/", (req, res) => {
	res.json({ success: true, data: "MARKETPLACE SERVICE" });
});

app.use("/api", apiRoute);
app.use("/auth", authRoute);
//endregion

//region catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});
//endregion
//region error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};
	// render the error page
	res.status(err.status || 403);
	res.json({ success: false, message: "NOT FOUND" });
});
//endregion
module.exports = app;