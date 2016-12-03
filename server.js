const fs 	= require('fs');
var express = require('express');
var app 	= express();
var server 	= require('http').createServer(app);
var io 		= require('socket.io')(server);

var numUsers = 0;

app.use(express.static(__dirname + '/'));

app.get("/", function(req, res) {
	fs.readFile('./index.html', (err, html) => res.end(html));
});

io.on('connection', function(socket){ 
	var users = "";
	
	var allClients = [];	

	socket.on('new user', (data) => {
		++numUsers;

		var id = (Date.now() + "").substring(6) + "-" + Math.round((Math.random() * 100));

		var color = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);

		socket.username = data.username;
		socket.userId = id;
		socket.userColor = color;

		allClients.push(socket);

		socket.emit("color", { color: color });
		
		socket.broadcast.emit("new user", {username: data.username, id: id, color: color});
	});

	socket.on('message', (data) => {
		socket.broadcast.emit("message", data);
	});	

	socket.on('disconnect', function() {
		--numUsers;

		var i = allClients.indexOf(socket);
		allClients.splice(i, 1);

		socket.broadcast.emit("remove user", { 
			username: socket.username,
        	id: socket.userId
       });
	});
});

server.listen(3000, function(){
	console.log("Conectou!");
});