var painter = require('./assets/painter.js')
var fs = require('fs');
var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app).listen(8083)
  , io = require('socket.io').listen(server);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use("/assets", express.static(__dirname + '/assets'));

if( fs.existsSync('./assets/painting.txt') && fs.existsSync('./assets/altered_painting.txt')){
  console.log("Painting txt files exist")
}else{
  painter.createNewPainting();
  console.log("New painting & alteration txts created.")
}

var sessions = {}
var sessionCount = 0;
var totalSessionTime = 0;
var currentAverageSessionTime = 0;

var calcNewAverageSessionTime = function(time,count){
  var average = time/count;

  if( average > currentAverageSessionTime ){
    console.log('time spent increased to ' + average)
    currentAverageSessionTime = average;
    painter.overwritePainting();
    painter.makeAlteration();
  }else{
    console.log('time spent decreased to ' + average)
    currentAverageSessionTime = average;
    painter.makeAlteration();
  }
}

io.sockets.on('connection', function (socket) {
  console.log('Connected');
  sessions[socket.id] = Date.now();
  socket.on('disconnect', function () {
        var sessionLength = Date.now() - sessions[socket.id]
        console.log(sessionLength);
        sessionCount += 1;
        totalSessionTime += sessionLength;
        calcNewAverageSessionTime(totalSessionTime,sessionCount);
        delete sessions[socket.id];
    });
 });

app.get('/', function(req,res){
	res.render("index");
});