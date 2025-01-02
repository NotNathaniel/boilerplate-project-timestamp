// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  let date;

  // Check if a date parameter exists
  if (req.params.date) {
    const dateParam = isNaN(req.params.date)
      ? req.params.date
      : parseInt(req.params.date); // Handle Unix timestamps

    date = new Date(dateParam);

    // Handle invalid date
    if (date.toString() === "Invalid Date") {
      return res.json({ error: "Invalid Date" });
    }
  } else {
    // If no date parameter is provided, use the current date
    date = new Date();
  }

  // Return the valid date in Unix and UTC format
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
