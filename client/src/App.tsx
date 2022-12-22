
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/authPage";
import Character from "./pages/characterPage";
import HomePage from "./pages/homePage";
import { userStore } from "./stores";

export function App() {
  
  useEffect(() => {
    if(localStorage.getItem('token')){
      userStore.checkAuth()
    }
  }, [])
  
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/character/:id' element={<Character />} />
    </Routes>
  );
}

export default observer(App);
