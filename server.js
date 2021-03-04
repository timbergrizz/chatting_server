const express = require('express');
const socket = require('socket.io');
const http = require('http');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use('/css', express.static('./static/css'));
app.use('/js', express.static('./static/js'));

app.get("/", function(req, res){
    fs.readFile('./static/index.html', function(err, data){
        if(err) res.send(err);
        else{
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data);
            res.end();
        }
    })
});

io.sockets.on('connection', function(socket){
    socket.on('newUser', function(name){
        console.log(name + " joined the chatroom")
        socket.name = name;
        io.sockets.emit('update', {type : 'connect', name:'SERVER', message:name+' joined the chatroom'});
    })

    socket.on('message', function(data){
        data.name = socket.name;
        console.log(data);
        socket.broadcast.emit('update', data);
    });

    socket.on('disconnect', function(){
        console.log(socket.name + 'left chatroom');

        socket.broadcast.emit('update', {type: 'disconnect', name:"SERVER", message: socket.name +" left chatroom."});
    });
});


server.listen("8100", function(){
    console.log("alalalallal");
});