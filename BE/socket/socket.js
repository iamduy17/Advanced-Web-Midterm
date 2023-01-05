const { Server } = require("socket.io");
const { handleReceiveSubmit } = require("./voting");

module.exports = {
    startSocketServer: (server) => {
        const io = new Server(server);
        io.on("connect", (socket) => {
            console.log("socket abc", socket.id);
            socket.on("submit", (data) => {
                handleReceiveSubmit(io, data);
            });
            //another events...
        });
    }
}