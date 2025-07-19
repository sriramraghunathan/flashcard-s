const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const flashcardRoutes = require("./routes/flashcard");
const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

mongoose
  .connect("mongodb+srv://sriramr:sriram2002@cluster1.quqsvo7.mongodb.net/flashcard?retryWrites=true&w=majority&appName=Cluster1")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ DB Error:", err));

app.use("/api/folders", require("./routes/folders"));
app.use("/api/flashcards", flashcardRoutes);

app.listen(5000, () =>
  console.log("🚀 Server running on http://localhost:5000")
);
