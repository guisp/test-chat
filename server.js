const fs 	= require('fs');
var express = require('express');
var app 	= express();
var server 	= require('http').createServer(app);
var io 		= require('socket.io')(server);
var Question= require('./Question');

var numUsers = 0;

var allClients = [], clientsReadable = [];	
var users = "", allAnswered = false, qtdAnswred = 0, answeredUsers = [];

var question;

app.use(express.static(__dirname + '/'));

app.get("/", function(req, res) {
	fs.readFile('./index.html', (err, html) => res.end(html));
});

io.on('connection', function(socket){ 
	console.log('novo usuario');

	socket.on('init-server', function(data){
		startGame();
	});
	
	++numUsers;
	
	var id = socket.handshake.query['userId'];

	var color = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);

	socket.username = '';
	socket.userId = id;
	socket.userColor = color;

	allClients.push(socket);
	
	clientsReadable.push({
		'userId': id,
		'userColor': color
	});

	io.emit("new-user", {username: '', id: id, color: color, totalUsers: numUsers, clients: clientsReadable});

	socket.emit('new-question', {
		pergunta: question.pergunta,
		alternativas: question.alternativas,
		resposta: question.resposta
	});

	socket.on('message', function(data) {
		console.log('mensagem');

		socket.broadcast.emit("message", data);
	});	

	socket.on('resposta', function(data) {
		if(checkAnswer(data)) {
			socket.broadcast.emit("nova-resposta", data);
			if(data.alternativa == question.resposta) {
				// Continuar aqui fazendo saber a resposta para o ranking
			}
			checkAllAnswered();
		}
	});	

	socket.on('disconnect', function() {
		--numUsers;
		
		console.log('saiu');

		clientsReadable = clientsReadable.filter(function(actual, index, arr){
			return actual.userId !== socket.userId;		
		});

		var i = allClients.indexOf(socket);
		allClients.splice(i, 1);

		socket.broadcast.emit("remove user", { 
			username: socket.username,
        	id: socket.userId
       });
	});

	function checkAnswer(data) {
		console.log('before', answeredUsers);
		if(answeredUsers.indexOf(data.user) === -1) {
			answeredUsers.push(data.user);
		console.log('after', answeredUsers);
			
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
				resposta: question.resposta
			});
		} else {
			startGame();
			io.emit('end-game');
		}
	}
	
});

function startGame() {
	question = new Question();
}

startGame();

var port = process.env.PORT;
if (port == null || port == "") {
  port = 80;
}

server.listen(port, function(){
	console.log("Conectou!");
});