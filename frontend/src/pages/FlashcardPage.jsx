import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import FlashcardForm from "../components/FlashcardForm";
import FlashcardCard from "../components/FlashcardCard";

const API_BASE = "https://flashcard-s.onrender.com/api";

const FlashcardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionImage, setQuestionImage] = useState(null);
  const [answerImage, setAnswerImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editCardId, setEditCardId] = useState(null);

  useEffect(() => {
    fetchFlashcards();
  }, [id]);

  const fetchFlashcards = async () => {
    try {
      const res = await axios.get(`${API_BASE}/flashcards/folder/${id}`);
      setFlashcards(res.data);
    } catch (err) {
      console.error("Failed to load flashcards:", err);
    }
  };

  const resetForm = () => {
    setQuestion("");
    setAnswer("");
    setQuestionImage(null);
    setAnswerImage(null);
    setIsEditing(false);
    setEditCardId(null);
  };

  const handleAddFlashcard = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/flashcards/create`, {
        question,
        answer,
        questionImage,
        answerImage,
        folderId: id,
      });
      setFlashcards([...flashcards, res.data]);
      resetForm();
    } catch (err) {
      console.error("Add flashcard failed:", err);
    }
  };

  const handleEditFlashcard = (card) => {
    setIsEditing(true);
    setEditCardId(card._id);
    setQuestion(card.question);
    setAnswer(card.answer);
    setQuestionImage(card.questionImage);
    setAnswerImage(card.answerImage);
  };

  const handleUpdateFlashcard = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE}/flashcards/update/${editCardId}`, {
        question,
        answer,
        questionImage,
        answerImage,
      });

      const updated = flashcards.map((card) =>
        card._id === editCardId
          ? { ...card, question, answer, questionImage, answerImage }
          : card
      );
      setFlashcards(updated);
      resetForm();
    } catch (err) {
      console.error("Update flashcard failed:", err);
    }
  };

  const handleDeleteFlashcard = async (cardId) => {
    if (!window.confirm("Are you sure you want to delete this flashcard?"))
      return;
    try {
      await axios.delete(`${API_BASE}/flashcards/${cardId}`);
      setFlashcards(flashcards.filter((card) => card._id !== cardId));
    } catch (err) {
      console.error("Delete flashcard failed:", err);
    }
  };

  return (
    <div className="px-4 py-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-800">
          📚 Flashcards
        </h1>
        <button
          onClick={() => navigate("/")}
          className="text-sm bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          ← Back to Home
        </button>
      </div>

      {/* Flashcard Form */}
      <FlashcardForm
        question={question}
        setQuestion={setQuestion}
        answer={answer}
        setAnswer={setAnswer}
        questionImage={questionImage}
        setQuestionImage={setQuestionImage}
        answerImage={answerImage}
        setAnswerImage={setAnswerImage}
        handleAddFlashcard={handleAddFlashcard}
        handleUpdateFlashcard={handleUpdateFlashcard}
        isEditing={isEditing}
        cancelEdit={resetForm}
      />

      {/* Flashcard Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {flashcards.map((card) => (
          <FlashcardCard
            key={card._id}
            card={card}
            onEdit={handleEditFlashcard}
            onDelete={handleDeleteFlashcard}
          />
        ))}
      </div>

      {/* Back to Top Button */}
      <div className="text-center mt-16">
        <a
          href="#top"
          className="inline-block p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition"
        >
          <span className="material-icons text-white text-4xl">
            keyboard_arrow_up
          </span>
        </a>
      </div>
    </div>
  );
};

export default FlashcardPage;
