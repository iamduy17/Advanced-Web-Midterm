const presentationService = require("../services/presentationService");

module.exports = {
  handleChatMessage: async (io, data) => {
    const { newDataChats, id_presentation } = data;
    io.in(`presentation ${id_presentation}`).emit(
      "receive_message_chat",
      newDataChats
    );
    await presentationService.EditChats(
      id_presentation,
      JSON.stringify(newDataChats)
    );
  },
  handleLoadChatsAndQuestions: async (socket, id_presentation) => {
    const result = await presentationService.GetPresentation(id_presentation);

    if (result.ReturnCode == 200) {
      const presentation = result.Data.Presentation;
      socket.emit("load_chats_and_questions", presentation);
    }
  }
};
