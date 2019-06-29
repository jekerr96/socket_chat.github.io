let socket = io("https://daily-marsupial.glitch.me");

socket.on("onConnect", (data) => {

});

let canvas = document.querySelector(".canvas");
let ctx = canvas.getContext("2d");
let players = {};
let myPlayer = {};

socket.on("getMyPlayer", (data) => {
    myPlayer = players[data.id];
});

socket.on("getPlayers", (data) => {
    for (let id in data) {
        players[id] = new Player(data[id].x, data[id].y, data[id].color, id);
    }

    drawPlayers();
});

socket.emit("newPlayer", {
    x: 25,
    y: 30,
    color: "#000",
});

socket.on("newPlayer", (data) => {
    players[data.id] = new Player(data.x, data.y, data.color, data.id);

    drawPlayers();
});

socket.on("update", (data) => {
   players[data.id].x = data.x;
   players[data.id].y = data.y;

   drawPlayers();
});

socket.on("playerDisconnect", (data) => {
   delete players[data.id];

   drawPlayers();
});

function drawPlayers() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let id in players) {
        players[id].draw();
    }
}

class Player {
    constructor(x, y, color, id) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.id = id;

        socket.on("getPosition", (data) => {
           this.x = data.x;
           this.y = data.y;
        });
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x * 9, this.y * 9, canvas.width / 50, canvas.height / 30);
    }

    updatePosition() {
        if (this.id === myPlayer.id) return;
        socket.emit("getPosition", {id: this.id});
    }
}

window.addEventListener("keypress", (e) => {
    console.log(e);
    if (e.code == "KeyA") {
        myPlayer.x--;
    }

    if (e.code == "KeyD") {
        myPlayer.x++;
    }

    if (e.code == "KeyW") {
        myPlayer.y--;
    }

    if (e.code == "KeyS") {
        myPlayer.y++;
    }

    socket.emit("update", {
        x: myPlayer.x,
        y: myPlayer.y
    });

    drawPlayers();
});