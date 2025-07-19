const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Folder = require("../models/Folder");
const Flashcard = require("../models/Flashcard");

router.delete("/:id", async (req, res) => {
  const folderId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(folderId)) {
    return res.status(400).json({ error: "Invalid folder ID" });
  }

  try {
    const deletedFlashcards = await Flashcard.deleteMany({ folderId });
    const deletedFolder = await Folder.findByIdAndDelete(folderId);

    if (!deletedFolder) {
      return res.status(404).json({ error: "Folder not found" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error deleting folder:", err);
    res.status(500).json({ error: err.message || "Failed to delete folder" });
  }
});

module.exports = router;
