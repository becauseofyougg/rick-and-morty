import AuthPage from 'pages/Auth';
import CharacterPage from 'pages/Characters';
import HomePage from 'pages/Main';
import { Route, Routes } from 'react-router-dom';

export const RouterTree = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/character/:id" element={<CharacterPage />} />
    </Routes>
  );
};

export default RouterTree;
