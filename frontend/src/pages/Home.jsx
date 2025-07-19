import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [folders, setFolders] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [editingFolderId, setEditingFolderId] = useState(null);
  const [editingFolderName, setEditingFolderName] = useState("");
  const [activeMenuId, setActiveMenuId] = useState(null); // for 3-dot menu
  const navigate = useNavigate();

  const fetchFolders = async () => {
    const res = await axios.get("https://flashcard-s.onrender.com/api/folders");
    setFolders(res.data);
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const createFolder = async (e) => {
    e.preventDefault();
    if (!folderName.trim()) return;
    const res = await axios.post(
      "https://flashcard-s.onrender.com/api/folders/create",
      {
        name: folderName,
      }
    );
    setFolderName("");
    setFolders([...folders, res.data]);
  };

  const deleteFolder = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this folder and its flashcards?"
      )
    )
      return;
    await axios.delete(`https://flashcard-s.onrender.com/api/folders/${id}`);
    setFolders(folders.filter((f) => f._id !== id));
  };

  const renameFolder = async (id) => {
    if (!editingFolderName.trim()) return;
    await axios.put(`https://flashcard-s.onrender.com/api/folders/${id}`, {
      name: editingFolderName,
    });
    fetchFolders();
    setEditingFolderId(null);
    setEditingFolderName("");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">📁 Your Folders</h1>

      <form onSubmit={createFolder} className="flex gap-2 mb-6">
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="New Folder Name"
        />
        <button className="bg-green-500 px-4 py-2 text-white rounded hover:bg-green-600">
          Add
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {folders.map((folder) => (
          <div
            key={folder._id}
            className="border p-4 rounded relative hover:shadow-md group"
          >
            {editingFolderId === folder._id ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  className="border p-2 rounded"
                  value={editingFolderName}
                  onChange={(e) => setEditingFolderName(e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => renameFolder(folder._id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingFolderId(null);
                      setEditingFolderName("");
                    }}
                    className="bg-gray-400 text-white px-2 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => navigate(`/folder/${folder._id}`)}
                className="cursor-pointer"
              >
                <h2 className="text-lg font-semibold text-blue-600">
                  {folder.name}
                </h2>
              </div>
            )}

            {/* 3-dot menu button */}
            <div className="absolute top-2 right-2 text-gray-500">
              <button
                onClick={() =>
                  setActiveMenuId(
                    activeMenuId === folder._id ? null : folder._id
                  )
                }
              >
                ⋮
              </button>
              {activeMenuId === folder._id && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-10 w-32">
                  <button
                    onClick={() => {
                      setEditingFolderId(folder._id);
                      setEditingFolderName(folder.name);
                      setActiveMenuId(null);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    ✏️ Rename
                  </button>
                  <button
                    onClick={() => {
                      deleteFolder(folder._id);
                      setActiveMenuId(null);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
