module.exports = {
  handleReceiveSubmit: (io, data) => {
    io.sockets.to(data.slideID).emit("received submit", data);
    //socket.emit("received submit", data)
  }
};
