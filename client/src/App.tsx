
import React from "react";
import { Route, Routes } from "react-router-dom";
import Character from "./components/character";
import HomePage from "./components/homePage";

export function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/character/:id' element={<Character />} />
    </Routes>
  );
}

export default App;
