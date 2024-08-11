"use client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import NoteDetail from "./Note";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes/:id" element={<NoteDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
