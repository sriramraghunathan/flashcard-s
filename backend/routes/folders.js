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

module.exports = router;
