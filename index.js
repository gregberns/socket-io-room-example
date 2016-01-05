var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var http = require('http').Server(app);
var io = require('socket.io')(http);
var uuid = require('node-uuid');

app.use(bodyParser.json());

app.get('/', function(req, res){
    res.sendfile('index.html');
});


//Client calls a GET method.

// A UUID is returned, and the server opens a room with that UUID

// A background job goes ad gets stuff

//when things are retrieved, an event is thrown and sent to the client
// Maybe go and get 100 web sites??

//The event returns a URL

var _socket;

io.on('connection', function(socket){
    
    _socket = socket;
    
    socket.on('create', function (room) {
        socket.join(room);
    });
    
});

app.get('/api/req', function(req, res){
    var id = uuid.v4();
    res.json({ roomId: id})
})

app.post('/api/req', function(req, res){
    newMessage(req.body.roomId, req.body.msg)
    res.json({})
})

function newMessage(roomId, msg){
    io.sockets.in(roomId).emit('update', msg);
}


http.listen(3000, function(){
    console.log('listening on *:3000');
});