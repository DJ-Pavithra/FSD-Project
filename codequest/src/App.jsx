import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Aptitude1 from './pages/Aptitude.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aptitude" element={<Aptitude1 />} />
    </Routes>
  );
};

export default App;
