import React, { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthPage from './pages/authPage';
import CharacterPage from './pages/characterPage';
import HomePage from './pages/homePage';
import { userStore } from './stores';

export const App: FC = () => {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      userStore.checkAuth();
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/character/:id" element={<CharacterPage />} />
    </Routes>
  );
};

export default App;
