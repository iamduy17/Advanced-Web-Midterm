const { Server } = require("socket.io");
const { handleReceiveSubmit } = require("./voting");
const { userGroup } = require("./userGroup");
const account_groupModel = require("../models/account_groupModel");
const { CLIENT_URL } = require("../config/index");

module.exports = {
    startSocketServer: (server) => {
        const io = new Server(server, {
            cors: {
                origin: CLIENT_URL,
                methods: ['GET', 'POST'],
            },
        });
        io.on("connection", (socket) => {
            console.log("socket abc", socket.id);
            socket.on("submit", (data) => {
                handleReceiveSubmit(io, data);
            });
            //another events...
            socket.on('presenting', (data) => {
                const { id, presentationGroupID, URL_Presentation } = data;
                //userGroup(io, presentationGroupID);

                socket.broadcast.emit('receive_presenting', { id, presentationGroupID, URL_Presentation });
            });
        });
    }
}