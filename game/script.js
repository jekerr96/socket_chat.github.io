let socket = io("https://daily-marsupial.glitch.me");

socket.on("onConnect", (data) => {

});

let canvas = document.querySelector(".canvas");
let ctx = canvas.getContext("2d");
let players = {};
let myPlayer = {};

Colors = {};
Colors.names = {
    aqua: "#00ffff",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    black: "#000000",
    blue: "#0000ff",
    brown: "#a52a2a",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgrey: "#a9a9a9",
    darkgreen: "#006400",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkviolet: "#9400d3",
    fuchsia: "#ff00ff",
    gold: "#ffd700",
    green: "#008000",
    indigo: "#4b0082",
    khaki: "#f0e68c",
    lightblue: "#add8e6",
    lightcyan: "#e0ffff",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    magenta: "#ff00ff",
    maroon: "#800000",
    navy: "#000080",
    olive: "#808000",
    orange: "#ffa500",
    pink: "#ffc0cb",
    purple: "#800080",
    violet: "#800080",
    red: "#ff0000",
    silver: "#c0c0c0",
    white: "#ffffff",
    yellow: "#ffff00"
};
Colors.random = function() {
    let result;
    let count = 0;
    for (let prop in this.names)
        if (Math.random() < 1/++count)
            result = prop;
    return result;
};

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
    color: Colors.random(),
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