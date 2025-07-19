const express = require("express");
const router = express.Router();
const Flashcard = require("../models/Flashcard");


router.get("/folder/:id", async (req, res) => {
  try {
    const flashcards = await Flashcard.find({ folderId: req.params.id });
    res.json(flashcards);
  } catch (err) {
    console.error("Fetch flashcards error:", err);
    res.status(500).json({ error: "Failed to fetch flashcards" });
  }
});


router.post("/create", async (req, res) => {
  const card = new Flashcard(req.body);
  await card.save();
  res.json(card);
});

router.put("/update/:id", async (req, res) => {
  const updated = await Flashcard.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});


router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Flashcard.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Flashcard not found" });
    res.json({ success: true });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Delete failed" });
  }
});



module.exports = router;
