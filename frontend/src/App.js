import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FlashcardPage from "./pages/FlashcardPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/folder/:id" element={<FlashcardPage />} />
    </Routes>
  );
};

export default App;
