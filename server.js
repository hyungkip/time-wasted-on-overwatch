var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(bodyParser.json());
app.use('/', express.static(__dirname));

var port = process.env.PORT || 1337;

var server = app.listen(port, function () {
	console.log('Server is running on http://localhost:' + port);
});
