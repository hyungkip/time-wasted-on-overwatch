var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/client'));

var port = process.env.PORT || 1337;

var server = app.listen(port, function() {
  console.log('http://localhost:' + port);
});

module.exports = app;
