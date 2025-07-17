import React, { useEffect, useState } from "react";
import axios from "axios";
import FolderList from "./components/FolderList";
import FlashcardForm from "./components/FlashcardForm";
import FlashcardList from "./components/FlashcardList";

const API = "https://flashcard-s.onrender.com/api";

function App() {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [flashcards, setFlashcards] = useState([]);

  const [folderName, setFolderName] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionImage, setQuestionImage] = useState("");
  const [answerImage, setAnswerImage] = useState("");
  const [editingCardId, setEditingCardId] = useState(null);

  useEffect(() => {
    axios.get(`${API}/folders`).then((res) => setFolders(res.data));
  }, []);

  const fetchFlashcards = async (folderId) => {
    const res = await axios.get(`${API}/flashcards/${folderId}`);
    setFlashcards(res.data);
  };

  const createFolder = async (e) => {
    e.preventDefault();
    if (!folderName.trim()) return;
    const res = await axios.post(`${API}/folders/create`, { name: folderName });
    setFolders([...folders, res.data]);
    setFolderName("");
  };

  const handleAddFlashcard = async (e) => {
    e.preventDefault();
    await axios.post(`${API}/flashcards/create`, {
      folderId: selectedFolder,
      question,
      answer,
      questionImage,
      answerImage,
    });
    fetchFlashcards(selectedFolder);
    clearForm();
  };

  const handleUpdateFlashcard = async (e) => {
    e.preventDefault();
    await axios.put(`${API}/flashcards/update/${editingCardId}`, {
      question,
      answer,
      questionImage,
      answerImage,
    });
    fetchFlashcards(selectedFolder);
    clearForm();
  };

  const handleDeleteFlashcard = async (id) => {
    await axios.delete(`${API}/flashcards/delete/${id}`);
    fetchFlashcards(selectedFolder);
  };

  const handleEditFlashcard = (card) => {
    setQuestion(card.question);
    setAnswer(card.answer);
    setQuestionImage(card.questionImage);
    setAnswerImage(card.answerImage);
    setEditingCardId(card._id);
  };

  const clearForm = () => {
    setQuestion("");
    setAnswer("");
    setQuestionImage("");
    setAnswerImage("");
    setEditingCardId(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        📚 Flashcard App
      </h1>

      <FolderList
        folders={folders}
        selectedFolder={selectedFolder}
        setSelectedFolder={(id) => {
          setSelectedFolder(id);
          fetchFlashcards(id);
        }}
        folderName={folderName}
        setFolderName={setFolderName}
        createFolder={createFolder}
      />

      {selectedFolder && (
        <>
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
            isEditing={!!editingCardId}
            cancelEdit={clearForm}
          />

          <FlashcardList
            flashcards={flashcards}
            onDelete={handleDeleteFlashcard}
            onEdit={handleEditFlashcard}
          />
        </>
      )}
    </div>
  );
}

export default App;
