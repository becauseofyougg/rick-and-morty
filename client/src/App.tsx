
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/auth";
import Character from "./components/character";
import HomePage from "./components/homePage";
import { userStore } from "./stores";

export function App() {
  useEffect(() => {
    if(sessionStorage.getItem('token')){
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
