import {io} from "socket.io-client";

class Socket {
    constructor(url = "https://socket-anon-chat.glitch.me", opts = {}, callbacks = {}) {
        this.socket = io(url, {
            ...opts,
            reconnectionDelayMax: 10000,
        });

        this.callbacks = callbacks;
        this.registerEvents();
    }

    registerEvents() {
        this.socket.on("onFind", this.callbacks.onFind);
    }

    find(findParams) {
        this.socket.emit("find", findParams);
    }

    cancelFind() {
        this.socket.removeListener("onFind");
    }
}

export default Socket;