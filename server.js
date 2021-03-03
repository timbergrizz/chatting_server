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

server.listen("8100", function(){
    console.log("alalalallal");
});