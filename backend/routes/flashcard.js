const express = require("express");
const router = express.Router();
const Flashcard = require("../models/Flashcard");

router.get("/:folderId", async (req, res) => {
  const cards = await Flashcard.find({ folderId: req.params.folderId });
  res.json(cards);
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

router.delete("/delete/:id", async (req, res) => {
  await Flashcard.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
