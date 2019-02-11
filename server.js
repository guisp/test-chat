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
	var users = "", allAnswered = false, qtdAnswred = 0, answeredUsers = [];
	console.log('novo usuario');
	var allClients = [];	
	io.emit('teste', { message: 'be received by everyone'});

	socket.on('new-user', (data) => {
		++numUsers;
		console.log('novo usuário');
		var id = (Date.now() + "").substring(6) + "-" + Math.round((Math.random() * 100));

		var color = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);

		socket.username = data.username;
		socket.userId = id;
		socket.userColor = color;

		allClients.push(socket);

		socket.emit("color", { color: color });
		
		socket.broadcast.emit("new-user", {username: data.username, id: id, color: color, totalUsers: numUsers});
	});

	socket.on('message', function(data) {
		console.log('mensagem');

		socket.broadcast.emit("message", data);
	});	

	socket.on('resposta', function(data) {
		if(checkAnswer(data)) {
			socket.broadcast.emit("nova-resposta", data);

			checkAllAnswered();
		}
	});	

	socket.on('disconnect', function() {
		--numUsers;
		
		console.log('saiu');

		var i = allClients.indexOf(socket);
		allClients.splice(i, 1);

		socket.broadcast.emit("remove user", { 
			username: socket.username,
        	id: socket.userId
       });
	});

	function checkAnswer(data) {
		if(answeredUsers.indexOf(data.user) !== -1) {
			answeredUsers.push(data.user);
			
			++qtdAnswred;
			
			return true;
		} else {
			return false;
		}
	}
	
	function checkAllAnswered() {
		if(numUsers <= qtdAnswred) {
			socket.broadcast.emit('end-question');
		}
	}
});


var port = process.env.PORT;
if (port == null || port == "") {
  port = 80;
}

server.listen(port, function(){
	console.log("Conectou!");
});