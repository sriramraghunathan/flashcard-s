const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema({
  question: String,
  questionImage: String,
  answer: String,
  answerImage: String,
  folderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    required: true,
  },
});

module.exports = mongoose.model("Flashcard", flashcardSchema);
