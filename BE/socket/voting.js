module.exports = {
    handleReceiveSubmit: (io, data) => {
        console.log("abcdef");
        io.sockets.emit("received submit", data);
        //socket.emit("received submit", data)
    }
}