const presentationService = require("../services/presentationService");

module.exports = {
  handleQuestionMessage: async (io, data) => {
    const { newDataQuestions, id_presentation } = data;
    io.in(`presentation ${id_presentation}`).emit(
      "receive_question",
      newDataQuestions
    );
    await presentationService.EditQuestions(
      id_presentation,
      JSON.stringify(newDataQuestions)
    );
  }
};
