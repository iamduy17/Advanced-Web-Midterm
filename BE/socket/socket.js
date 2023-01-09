const { Server } = require("socket.io");
const { handleReceiveSubmit } = require("./voting");
const { handleChatMessage, handleLoadChatsAndQuestions } = require("./chat");
const { handleQuestionMessage } = require("./question");
const { CLIENT_URL } = require("../config/index");

module.exports = {
  startSocketServer: (server) => {
    const io = new Server(server, {
      cors: {
        origin: CLIENT_URL,
        methods: ['GET', 'POST'],
      },
    });
    io.on("connect", (socket) => {
      console.log("socket abc", socket.id);
      socket.on("submit", (data) => {
        handleReceiveSubmit(io, data);
      });
      socket.on("submit-paragraph-heading", (data) => {
        handleReceiveSubmit(io, data);
      });
      socket.on("join-slide", (data) => {
        const { slideID } = data;
        socket.join(slideID); // Join the user to a socket room
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
