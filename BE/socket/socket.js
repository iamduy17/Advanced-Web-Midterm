const { Server } = require("socket.io");
const { handleReceiveSubmit } = require("./voting");
const { handleChatMessage, handleLoadChatsAndQuestions } = require("./chat");
const { handleQuestionMessage } = require("./question");

module.exports = {
  startSocketServer: (server) => {
    const io = new Server(server);
    io.on("connect", (socket) => {
      console.log("socket abc", socket.id);
      socket.on("submit", (data) => {
        handleReceiveSubmit(io, data);
      });
      //another events...
      socket.on("presenting", (data) => {
        const { id, presentationGroupID, URL_Presentation } = data;
        //userGroup(io, presentationGroupID);

        socket.broadcast.emit("receive_presenting", {
          id,
          presentationGroupID,
          URL_Presentation
        });
      });
      // add user to room
      socket.on("join_presentation_room", (data) => {
        const { id_presentation } = data;
        socket.join(`presentation ${id_presentation}`);

        handleLoadChatsAndQuestions(socket, id_presentation);
      });

      // send message
      socket.on("send_message_chat", (data) => {
        handleChatMessage(io, data);
      });

      // send questions
      socket.on("send_question", (data) => {
        handleQuestionMessage(io, data);
      });
    });
  }
};
