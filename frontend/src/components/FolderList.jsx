import React from "react";

const FolderList = ({
  folders,
  selectedFolder,
  setSelectedFolder,
  folderName,
  setFolderName,
  createFolder,
}) => {
  return (
    <div className="mb-6">
      <form onSubmit={createFolder} className="mb-4 flex gap-2">
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="New folder name"
          className="border p-2 flex-1 rounded"
          required
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add Folder
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2 text-blue-700">
        📁 Select Folder
      </h2>
      <div className="flex flex-wrap gap-2">
        {folders.map((folder) => (
          <button
            key={folder._id}
            onClick={() => setSelectedFolder(folder._id)}
            className={`px-4 py-2 rounded border ${
              selectedFolder === folder._id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {folder.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FolderList;
