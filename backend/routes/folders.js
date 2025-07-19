const express = require("express");
const router = express.Router();
const Folder = require("../models/Folder");

router.get("/", async (req, res) => {
  const folders = await Folder.find();
  res.json(folders);
});

router.post("/create", async (req, res) => {
  const folder = new Folder({ name: req.body.name });
  await folder.save();
  res.json(folder);
});
router.delete("/:id", async (req, res) => {
  try {
    await Folder.findByIdAndDelete(req.params.id);
    await Flashcard.deleteMany({ folderId: req.params.id }); // 👈 remove related flashcards
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete folder" });
  }
});


module.exports = router;
