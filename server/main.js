var express = require('express'),
	app = express(),
	http = require("http").Server(app),
	io = require("socket.io")(http),
	Player = require("./player").Player;


var socket,
    players;

app.use(express.static(__dirname + '/../'));
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/../index.html');
});

http.listen(8000, function () {
	console.log('Server running at http://127.0.0.1:8000/');
});


function init() {
    players = [];
    io.on('connection', onSocketConnection)
};

init();



function onSocketConnection(client) {
    console.log("New player has connected: " + client.id);

    client.on("disconnect", function (data) {
	    console.log("Player has disconnected: " + this.id);

		io.sockets.emit("remove player", {id: data.id});

		for (var i = 0; i < players.length; i++)
		    if (players[i].id === this.id) {
		        players.splice(i, 1);
		        break;
		    }
	});


    client.on("new player", onNewPlayer);


    client.on("move", function (data) {
		this.broadcast.emit("move player", { cursors: data, id: this.id });
    });
};


function onNewPlayer(data) {
	var newPlayer = new Player(data.x, data.y);
	newPlayer.id = this.id;

	console.log('Broadcasting new player')

	// Broadcast everyone about the new player
	this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY()});

	// Update the new player about everyone
	var i, existingPlayer;
	for (i = 0; i < players.length; i++) {
	    existingPlayer = players[i];
    	this.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY()});
	};

	players.push(newPlayer);
};
