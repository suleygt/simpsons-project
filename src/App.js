

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import AddPage from "./pages/AddPage";
import { CharacterProvider } from "./context/CharacterContext";

function App() {
  return (
    <CharacterProvider>
      <Router>
        <Routes>import './App.css';
          <Route path="/" element={<ListPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/add" element={<AddPage />} />
        </Routes>
      </Router>
    </CharacterProvider>
  );
}

export default App;