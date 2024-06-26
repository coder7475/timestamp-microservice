// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// default route
app.get("/api", (req, res) => {
  const date = new Date();
  res.json({ unix: date.getTime(),
    utc: date.toGMTString()})
})

// date by params
app.get("/api/:date", (req, res) => {
  let utcDate = req.params.date;
  if ((/^([0-9])+$/gi).test(utcDate)){
    utcDate = parseInt(utcDate);
  } 
  const date = new Date(utcDate);
  const response = isDateValid(date) ? {
    unix: date.getTime(),
    utc: date.toGMTString()
  } : {
    error: date.toString()
  }
  res.json(response)
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function isDateValid(dateStr) {
  return !isNaN(new Date(dateStr));
}