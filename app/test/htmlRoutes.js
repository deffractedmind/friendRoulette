var express = require('express');
var bodyParser = require("body-parser");
var path = require("path");

// 3. Your `htmlRoutes.js` file should include two routes:

//    * A GET Route to `/survey` which should display the survey page.
//    * A default USE route that leads to `home.html` which displays the home page.

// Routes
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.get("/api/friends", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});

// var path = require('path');

// module.exports = function(app){

//   app.get('/survey', function (req, res) {
//      res.sendFile(path.join(__dirname, '../public/survey.html'));
//   });

//   app.use('/', function (req, res) {
// 	   res.sendFile(path.join(__dirname, '../public/home.html'));
//   });
// };