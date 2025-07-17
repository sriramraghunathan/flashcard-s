const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("Folder", folderSchema);
