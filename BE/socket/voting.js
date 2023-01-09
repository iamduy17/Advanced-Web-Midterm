module.exports = {
  handleReceiveSubmit: (io, data) => {
    io.sockets.emit("received submit", data);
    //socket.emit("received submit", data)
  }
};
