/* Part II: Collaboration */
/*------------------------*/

// initialization
console.log('Initializing...');
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/'));
var server = require('http').Server(app);
var io = require('socket.io')(server);
console.log('Success');

// route handler
app.get('/', function (req, res) {
    res.sendfile('index.html');
});

// make the http server listen on port 3000
server.listen(3000, function () {
    console.log('listening on *:3000');
});


var active_connection = 0;
io.on('connection', function(socket){
    // user connection
    active_connection++;
    console.log('a user connected. Active users: ' + active_connection.toString());

    socket.on('draw', function(data){
        io.emit('draw', data);
        console.log(data);
    });


    // user disconnection
    socket.on('disconnect', function(){
        active_connection--;
        console.log('user disconnected. Active users: ' + active_connection.toString());
    });

});