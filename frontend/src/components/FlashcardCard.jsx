import React, { useState } from "react";

const FlashcardCard = ({ card, onEdit, onDelete }) => {
  const [flipped, setFlipped] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className="relative group w-full h-60 perspective"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute w-full h-auto backface-hidden bg-white border rounded p-4  shadow-md">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-blue-600">Question</h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              ⋮
            </button>
          </div>
          {card.questionImage && (
            <img
              src={card.questionImage}
              alt="Question"
              className="w-full h-full object-cover rounded"
            />
          )}
          <p className="mt-2 text-gray-700">{card.question}</p>
        </div>

        {/* Back */}
        <div className="absolute w-full h-auto backface-hidden bg-blue-50 border rounded p-10 shadow-md rotate-y-180">
          <h3 className="text-lg font-bold text-green-700">Answer</h3>
          {card.answerImage && (
            <img
              src={card.answerImage}
              alt="Answer"
              className="w-full h-full object-cover rounded"
            />
          )}
          <p className="mt-2 text-gray-800">{card.answer}</p>
        </div>
      </div>

      {/* Edit/Delete Menu */}
      {showMenu && (
        <div
          className="absolute top-8 right-2 bg-white border rounded shadow-md z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
            onClick={() => {
              setShowMenu(false);
              onEdit(card);
            }}
          >
            ✏️ Edit
          </button>
          <button
            className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
            onClick={() => {
              setShowMenu(false);
              onDelete(card._id);
            }}
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default FlashcardCard;
