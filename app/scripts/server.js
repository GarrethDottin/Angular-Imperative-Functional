var express = require('express'), 
	app = express(), 
	http = require('request'), 
	Promise = require('promise'), 
	bodyParser = require('body-parser'), 
	moment = require('moment');

app.use(express.static(__dirname + '/scripts'));

app.use(bodyParser.json({
  extended: true
}));

app.get('/drones', function (req, res){ 
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
	res.json(require('./Mock_Data.json'));
});

app.get('/drones/1', function(req, res) { 
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
	res.json(require('./initial_data.json'));


});

app.get('/drones/:id', function(req, res){ 
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
	res.json(require('./drone_data.json'));
	// Send back JSON file of single user
})
var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://' + port);
});