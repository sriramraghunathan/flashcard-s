import React, { useState } from "react";

const FlashcardCard = ({ card, onEdit, onDelete }) => {
  const [flipped, setFlipped] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className="relative group w-full h-60 sm:h-64 md:h-72 lg:h-80 xl:h-96 perspective cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden bg-blue-50 border rounded p-4 sm:p-6 md:p-8 shadow-md overflow-auto">
          <div className="flex justify-between items-start">
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-blue-600">
              Question
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ⋮
            </button>
          </div>
          {card.questionImage && (
            <img
              src={card.questionImage}
              alt="Question"
              className="w-full h-32 sm:h-40 md:h-48 object-contain rounded mt-2"
            />
          )}
          <p className="mt-2 text-sm sm:text-base text-gray-700 break-words">
            {card.question}
          </p>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden bg-blue-50 border rounded p-4 sm:p-6 md:p-8 shadow-md rotate-y-180 overflow-auto">
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-green-700">
            Answer
          </h3>
          {card.answerImage && (
            <img
              src={card.answerImage}
              alt="Answer"
              className="w-full h-32 sm:h-40 md:h-48 object-contain rounded mt-2"
            />
          )}
          <p className="mt-2 text-sm sm:text-base text-gray-800 break-words">
            {card.answer}
          </p>
        </div>
      </div>

      {/* Edit/Delete Menu */}
      {showMenu && (
        <div
          className="absolute top-8 right-2 bg-white border rounded shadow-md z-20"
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
