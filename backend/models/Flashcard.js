const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema({
  folderId: String,
  question: String,
  answer: String,
  questionImage: String,
  answerImage: String,
});

module.exports = mongoose.model("Flashcard", flashcardSchema);
