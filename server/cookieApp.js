const express = require("express");
const dotenv = require("dotenv");
const router = require("./router/router");
const cors = require("cors");
const path = require("path");
const { initdb } = require("./initdb");
const { logIp, notfound, handleError } = require("./middlewares/errorHandler");
const logger = require("./library/logger");

// init Express server & envoirnment variables
const app = express();
dotenv.config();

//Init mongod
initdb();

// middlewares
app.use(cors());
app.use(logIp);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authToken, access-control-allow-origin"
  );
  next();
});

// api route
let baseurl = process.env.API_VERSION;
app.use(baseurl, router);

if (process.env.NODE_ENV === "production") {
  // api home
  app.get("/api", function (request, response) {
    response.sendFile(path.resolve(__dirname, "public", "index.html"));
  });

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, "../client/build")));

  // All remaining requests return the React app, so it can handle routing.
  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

// error handler
app.use(notfound);
app.use(handleError);

// http server listener
const port = process.env.PORT;
app.listen(port, () => logger.info(`Cookie Server launched at::${port}`));

// tests
module.exports = app;
