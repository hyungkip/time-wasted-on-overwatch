
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/../client'));

var port = process.env.PORT || 1337;

var server = app.listen(port, function() {
  console.log('http://localhost:' + port);
});

// app.get("https://api.lootbox.eu/pc/us/Hunky-1228/profile")
// .end(function (result) {
//   console.log(result.status, result.headers, result.body);
// });
// var options = "https://api.lootbox.eu/pc/us/Hunky-1228/profile"
// http.get(options, function(data) {
//     res.render('template', data);
// });

module.exports = app;
