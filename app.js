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

if(fs.existsSync('./assets/painting.txt')){
  console.log("Painting txt file exists")
}else{
  painter.createNewPainting();
  console.log("New painting txt file created.")
}


var sessions = {}

io.sockets.on('connection', function (socket) {
  console.log('Connected');
  sessions[socket.id] = Date.now();
  socket.on('disconnect', function () {
        var sessionLength = Date.now() - sessions[socket.id]
        console.log(sessionLength);
        delete sessions[socket.id];
    });
 });

app.get('/', function(req,res){
	res.render("index");
});

app.get('/2', function(req,res){
	res.render("index2");
});


painter.makeAlteration();

// do it in batches of 10/100 ?

// if + : keep change, make new
// if - : roll back last change