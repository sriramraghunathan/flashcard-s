import React from "react";

const FlashcardForm = ({
  question,
  setQuestion,
  answer,
  setAnswer,
  questionImage,
  setQuestionImage,
  answerImage,
  setAnswerImage,
  handleAddFlashcard,
  handleUpdateFlashcard,
  isEditing,
  cancelEdit,
}) => {
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "question") setQuestionImage(reader.result);
      else setAnswerImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <form
      onSubmit={isEditing ? handleUpdateFlashcard : handleAddFlashcard}
      className="bg-white p-4 rounded-xl shadow mb-6"
    >
      <h3 className="text-lg font-bold mb-3 text-blue-800">
        {isEditing ? "✏️ Edit Flashcard" : "➕ Add Flashcard"}
      </h3>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "question")}
        />
        <input
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "answer")}
        />

        <div className="flex gap-3 mt-3">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            {isEditing ? "Update" : "Add"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default FlashcardForm;
