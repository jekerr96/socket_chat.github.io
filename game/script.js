let socket = io("https://daily-marsupial.glitch.me");

socket.on("onConnect", (data) => {

});

let canvas = document.querySelector(".canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let sizeX = 32;
let sizeY = 18;
let ctx = canvas.getContext("2d");
let players = {};
let shoots = {};
let shootId = 0;
let myPlayer = {};
let enemies = {};
let canShoot = true;
let loadEnemies = false;
let die = false;

Colors = {};
Colors.names = {
    aqua: "#0ff",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    black: "#000",
    blue: "#00f",
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
    fuchsia: "#f0f",
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
    lime: "#0f0",
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
    yellow: "#ff0"
};
Colors.random = function () {
    let result;
    let count = 0;
    for (let prop in this.names)
        if (Math.random() < 1 / ++count)
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

socket.on("getEnemies", (data) => {
    for (let id in data) {
        enemies[id] = new Enemy(data[id].x, data[id].y);
    }

    loadEnemies = true;
    drawAll();
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

    drawAll();
});

socket.on("shoot", (data) => {
    shoots[shootId] = new Shoot(data.x, data.y, data.color, data.id, shootId);
    shootId++;
});

socket.on("playerDisconnect", (data) => {
    delete players[data.id];
    drawPlayers();
    drawAll();
});

socket.on("spawnEnemy", (data) => {
    enemies[data.id] = new Enemy(data.x, data.y);
    drawAll();
});

socket.on("updateEnemy", (data) => {
    if (!loadEnemies) return;
   for (let id in data) {
       enemies[id].x = data[id].x;
       enemies[id].y = data[id].y;
   }

   drawAll();
});

socket.on("deleteEnemy", (data) => {
   delete enemies[data.id];
   drawAll();
});

socket.on("killEnemy", (data) => {
   delete enemies[data.id];
   drawAll();
});

socket.on("diePlayer", (data) => {
   players[data.id].color = "transparent";
});

function drawAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayers();
    drawShoots();
    drawEnemies();
}

function drawPlayers() {
    for (let id in players) {
        players[id].draw();
    }
}

function drawShoots() {
    for (let id in shoots) {
        shoots[id].draw();
    }
}

function drawEnemies() {
    for (let id in enemies) {
        enemies[id].draw();
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
        ctx.fillRect(this.x * sizeX, this.y * sizeY, canvas.width / sizeX, canvas.height / sizeY);
    }
}

class Shoot {
    constructor(x, y, color, id) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.id = id;
        this.shootId = shootId;
        this.move();
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x * sizeX + (canvas.width / sizeX / 4), this.y * sizeY, canvas.width / sizeX / 2, canvas.height / sizeY / 2);
    }

    move() {
        this.moveInterval = setInterval(() => {
           this.y--;

           if (this.y < 0 || this.checkEnemy()) {
               delete shoots[this.shootId];
               clearInterval(this.moveInterval);
           }

           drawAll();

        }, 300);
    }


    checkEnemy() {
        for (let id in enemies) {
            if (this.x === enemies[id].x && this.y === enemies[id].y) {
                enemies[id].color = "transparent";
                return true;
            }
        }

        return false;
    }
}

class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = Colors.random();
    }

    draw() {
        this.checkPlayer();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x * sizeX + (canvas.width / sizeX / 4), this.y * sizeY, canvas.width / sizeX / 2, canvas.height / sizeY / 2);
    }

    checkPlayer() {
            if (this.x === myPlayer.x && this.y === myPlayer.y) {
                die = true;
                myPlayer.color = "transparent";
                socket.emit("diePlayer", {id: myPlayer.id});
            }
    }
}

window.addEventListener("keypress", (e) => {
    if (die) return;

    if (e.code === "KeyA") {
        myPlayer.x--;
    }

    if (e.code === "KeyD") {
        myPlayer.x++;
    }

    if (e.code === "KeyW") {
        myPlayer.y--;
    }

    if (e.code === "KeyS") {
        myPlayer.y++;
    }

    if (e.code === "Space") {
        if (canShoot) {
            socket.emit("shoot", {});
            shoots[shootId] = new Shoot(myPlayer.x, myPlayer.y - 1, myPlayer.color, myPlayer.id, shootId);
            shootId++;
            canShoot = false;

            setTimeout(() => {
                canShoot = true;
            }, 1000);
        }
    }

    socket.emit("update", {
        x: myPlayer.x,
        y: myPlayer.y
    });

    drawAll();
});