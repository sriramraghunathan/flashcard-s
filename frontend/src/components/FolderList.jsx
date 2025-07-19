import React, { useState } from "react";

const FolderList = ({
  folders,
  selectedFolder,
  setSelectedFolder,
  folderName,
  setFolderName,
  createFolder,
  onDeleteFolder,
  onRenameFolder,
}) => {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  return (
    <div className="mb-6">
      <form onSubmit={createFolder} className="mb-4 flex gap-2">
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="New folder name"
          className="border p-2 flex-1 rounded shadow-sm"
          required
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
          ➕ Add
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2 text-blue-700">📁 Folders</h2>
      <div className="flex flex-wrap gap-2">
        {folders.map((folder) => (
          <div
            key={folder._id}
            className={`flex items-center border px-4 py-2 rounded shadow-sm transition ${
              selectedFolder === folder._id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            {editingId === folder._id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onRenameFolder(folder._id, editName);
                  setEditingId(null);
                }}
              >
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="text-sm px-1 py-0.5 rounded border mr-2"
                  autoFocus
                />
              </form>
            ) : (
              <button
                onClick={() => setSelectedFolder(folder._id)}
                className="text-sm font-medium"
              >
                {folder.name}
              </button>
            )}

            <div className="ml-2 flex gap-1">
              {editingId !== folder._id && (
                <button
                  onClick={() => {
                    setEditingId(folder._id);
                    setEditName(folder.name);
                  }}
                  title="Edit"
                  className="text-yellow-500 hover:text-yellow-600"
                >
                  ✏️
                </button>
              )}
              <button
                onClick={() => {
                  if (
                    window.confirm("Delete this folder and its flashcards?")
                  ) {
                    onDeleteFolder(folder._id);
                  }
                }}
                title="Delete"
                className="text-red-500 hover:text-red-600"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FolderList;
