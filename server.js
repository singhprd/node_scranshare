var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('./client/build'));

app.use(function(req, res,next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

var server = app.listen(process.env.PORT || 3001, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('ScranShare started on http://%s:%s', host, port);
});








