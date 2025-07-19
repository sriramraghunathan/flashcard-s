const express = require("express");
const router = express.Router();
const Folder = require("../models/Folder");
const Flashcard = require("../models/Flashcard"); // Don't forget to import this
const mongoose = require("mongoose");

// Get all folders
router.get("/", async (req, res) => {
  try {
    const folders = await Folder.find();
    res.json(folders);
  } catch (err) {
    console.error("Error fetching folders:", err);
    res.status(500).json({ error: "Failed to fetch folders" });
  }
});

// Create a new folder
router.post("/create", async (req, res) => {
  try {
    const folder = new Folder({ name: req.body.name });
    await folder.save();
    res.json(folder);
  } catch (err) {
    console.error("Error creating folder:", err);
    res.status(500).json({ error: "Failed to create folder" });
  }
});

// Delete a folder (and flashcards inside it)
router.delete("/:id", async (req, res) => {
  const folderId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(folderId)) {
    return res.status(400).json({ error: "Invalid folder ID" });
  }

  try {
    // Step 1: Delete all flashcards in this folder
    const deletedFlashcards = await Flashcard.deleteMany({ folderId });

    // Step 2: Delete the folder
    const deletedFolder = await Folder.findByIdAndDelete(folderId);

    if (!deletedFolder) {
      return res.status(404).json({ error: "Folder not found" });
    }

    console.log(
      `✅ Deleted folder "${deletedFolder.name}" and ${deletedFlashcards.deletedCount} flashcards`
    );

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error deleting folder:", err);
    res.status(500).json({ error: "Failed to delete folder" });
  }
});

module.exports = router;
