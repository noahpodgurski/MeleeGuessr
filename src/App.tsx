import React, { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavbarPage from './components/Navbar';
import { Home } from './pages/Home';
import { Play } from './pages/Play';

const App: React.FC = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NavbarPage />} />
        </Routes>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/play" element={ <Play /> } />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;