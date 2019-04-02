const fs 	= require('fs');
var express = require('express');
var app 	= express();
var server 	= require('http').createServer(app);
var io 		= require('socket.io')(server);
var Question= require('./Question');

var numUsers = 0;

var allClients = [], clientsReadable = {}, usersOut = {};	
var users = "", allAnswered = false, qtdAnswred = 0, answeredUsers = [];

var question;


app.use(express.static(__dirname + '/'));

app.get("/", function(req, res) {
	fs.readFile('./index.html', (err, html) => res.end(html));
});

io.on('connection', function(socket){ 

	socket.on('init-server', function(data){
		startGame();
		question.pergunta = 0;

		io.emit('new-question', {
			pergunta: question.pergunta,
			alternativas: question.alternativas,
			resposta: question.resposta,
			clients: clientsReadable
		});
	});
	
	++numUsers;
	
	var id = socket.handshake.query['userId'];

	var color = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);

	socket.username = '';
	socket.userId = id;
	socket.userColor = color;

	allClients.push(socket);
	
	if(usersOut[id] !== undefined) {
		clientsReadable[id] = usersOut[id];
		delete usersOut[id];
	} else {
		clientsReadable[id] = {
			'userId': id,
			'userColor': color
		};
	}
	
	io.emit("new-user", {username: '', id: id, color: color, totalUsers: numUsers, clients: clientsReadable});

	socket.emit('new-question', {
		pergunta: question.pergunta,
		alternativas: question.alternativas,
		resposta: question.resposta,
		clients: clientsReadable
	});

	socket.on('change-user', function(data){
		
		if(data.newUser == undefined) return false;

		let oldInfo = clientsReadable[socket.userId];
		
		delete clientsReadable[socket.userId];

		socket.userId = data.newUser;
		clientsReadable[data.newUser] = oldInfo;
		clientsReadable[data.newUser].userId = data.newUser;

		io.emit("changed-user", {totalUsers: numUsers, clients: clientsReadable});
 
	});

	socket.on('message', function(data) {
		console.log('mensagem');

		socket.broadcast.emit("message", data);
	});	

	socket.on('resposta', function(data) {
		if(checkAnswer(data)) {
			socket.broadcast.emit("nova-resposta", data);
			
			if(data.alternativa === question.resposta) {
				console.log(data.user); 
				let score = clientsReadable[data.user].hint;
				clientsReadable[data.user].hint = score === undefined ? 1 : ++score;
			}
			checkAllAnswered();
		}
	});	

	socket.on('disconnect', function() {
		--numUsers;
		
		console.log('saiu');

		usersOut[socket.userId] = clientsReadable[socket.userId];
		delete clientsReadable[socket.userId];

		var i = allClients.indexOf(socket);
		allClients.splice(i, 1);

		socket.broadcast.emit("remove user", { 
			username: socket.username,
        	id: socket.userId
       });
	});

	function checkAnswer(data) {
		if(answeredUsers.indexOf(data.user) === -1) {
			answeredUsers.push(data.user);
			
			++qtdAnswred;
						
			return true;
		} else {
			return false;
		}
	}
	
	function checkAllAnswered() {
		if(qtdAnswred >= numUsers) {
			io.emit('end-question');
			answeredUsers = [];
			qtdAnswred = 0;

			nextQuestion();
		}
	}

	function nextQuestion() {
		if(question.next()) {
			io.emit('new-question', {
				pergunta: question.pergunta,
				alternativas: question.alternativas,
				resposta: question.resposta,
				clients: clientsReadable
			});
		} else {
			
			io.emit('end-game', { clients: clientsReadable });
      startGame();
      
		}
	}
	
});

function startGame() {
	
	question = new Question();
	
	for(let i = 0, j = Object.keys(clientsReadable).length; i < j; i++) {
		clientsReadable[Object.keys(clientsReadable)[i]].hint = 0;
	}
}

startGame();

var port = process.env.PORT;
if (port == null || port == "") {
  port = 80;
}

server.listen(port, function(){
	console.log("Conectou!");
});