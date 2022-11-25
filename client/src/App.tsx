
import React from "react";
import { Route, Routes } from "react-router-dom";
import Character from "./pages/character";
import HomePage from "./pages/homePage";

export function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/character/:id' element={<Character />} />
    </Routes>
  );
}

export default App;
