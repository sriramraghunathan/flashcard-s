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

      <div className="space-y-4">
        {/* Question Text */}
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border p-2 w-full rounded "
          required
        />

        {/* Question Image Upload */}
        <div className="flex items-center gap-3">
          <label className="bg-indigo-500  hover:bg-indigo-600 text-white px-3 py-2 rounded cursor-pointer">
            Add Question Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "question")}
              className="hidden"
            />
          </label>
          {questionImage && (
            <img
              src={questionImage}
              alt="Question preview"
              className="w-16 h-16 object-cover rounded border"
            />
          )}
        </div>

        {/* Answer Text */}
        <input
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />

        {/* Answer Image Upload */}
        <div className="flex items-center gap-3">
          <label className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded cursor-pointer">
            Add Answer Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "answer")}
              className="hidden"
            />
          </label>
          {answerImage && (
            <img
              src={answerImage}
              alt="Question preview"
              className="w-16 h-16 object-cover rounded border"
            />
          )}
        </div>
        <br />

        {/* Buttons */}
        <div className="flex gap-3 mt-3">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            {isEditing ? "Update" : "Add Card"}
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
