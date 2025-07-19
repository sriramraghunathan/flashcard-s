import React from "react";

const FolderList = ({
  folders,
  selectedFolder,
  setSelectedFolder,
  folderName,
  setFolderName,
  createFolder,
  onDeleteFolder,
}) => {
  return (
    <div className="mb-6">
      {/* Add Folder Form */}
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
      </form><br />

      {/* Folder List */}
      <h2 className="text-xl font-semibold mb-2 text-blue-700">
        📁 Select Folder
      </h2><br />
      <div className="flex flex-wrap gap-10">
        {folders.map((folder) => (
          <div
            key={folder._id}
            className={`relative px-8 py-8 rounded border min-w-[120px] cursor-pointer transition ${
              selectedFolder === folder._id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => setSelectedFolder(folder._id)}
          >
            <span className="block mr-5 text-center">{folder.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent selecting folder
                onDeleteFolder(folder._id);
              }}
              className=" font-semibold border-red-500 bg-red-300  p-2  absolute top-0 right-0 bottom-0 text-red-600 hover:text-red-800 text-sm"
              title="Delete Folder"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FolderList;
