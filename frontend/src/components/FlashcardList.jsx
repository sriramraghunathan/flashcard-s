import React, { useState } from "react";

const FlashcardList = ({ flashcards, onDelete, onEdit }) => {
  const [flipped, setFlipped] = useState(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {flashcards.map((card, index) => (
        <div
          key={card._id}
          onClick={() => setFlipped(flipped === index ? null : index)}
          className="cursor-pointer bg-white p-4 rounded shadow hover:shadow-lg transition"
        >
          {flipped === index ? (
            <>
              <h4 className="font-semibold text-blue-700">Answer:</h4>
              <p>{card.answer}</p>
              {card.answerImage && (
                <img
                  src={card.answerImage}
                  alt="Answer"
                  className="mt-2 rounded"
                />
              )}
            </>
          ) : (
            <>
              <h4 className="font-semibold text-blue-700">Question:</h4>
              <p>{card.question}</p>
              {card.questionImage && (
                <img
                  src={card.questionImage}
                  alt="Question"
                  className="mt-2 rounded"
                />
              )}
            </>
          )}

          <div className="flex gap-2 mt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(card);
              }}
              className="px-3 py-1 text-sm bg-yellow-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(card._id);
              }}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlashcardList;
