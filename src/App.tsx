import React, { StrictMode, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavbarPage from './components/Navbar';
import { LivesContext } from './hooks/UseLives';
import { Home } from './pages/Home';
import { Play } from './pages/Play';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  const [lives, setLives] = useState(3);
  return (
    <StrictMode>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {}
        }}
      />
      <LivesContext.Provider value={{lives: lives, setLives: setLives}}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NavbarPage />} />
          </Routes>
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/play" element={ <Play /> } />
          </Routes>
        </BrowserRouter>
      </LivesContext.Provider>
    </StrictMode>
  );
}

export default App;