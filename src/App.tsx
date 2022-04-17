import React, { StrictMode, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavbarPage from './components/Navbar';
import { LivesContext } from './hooks/UseLives';
import { Home } from './pages/Home';
import { Play } from './pages/Play';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';
import { ClipsContext } from './hooks/Clips';
import { Clip } from './models/Clip';
import { CharacterIds } from './consts/CharacterIds';
import { Player } from './consts/Player';
import { shuffleArray } from './utils/Shuffle';

const App: React.FC = () => {
  const [lives, setLives] = useState(3);
  const [clips, setClips] = useState<Clip[]>([]);
  const getClips = async () => {
    const res:any = await fetch("http://localhost:4000/clips");
    const _clips = await res.json();
    // console.log(_clips);
    console.log('here')
    // const shuffledClips = shuffleArray(_clips);
    const fixedClips = _clips.map((clip:any) => {
      if (!Player[clip['player']])
        // throw `${clip['player']} is not a Player object`
        // set TEST for now
        clip['player'] = "TEST";
      return {
        ...clip,
        // convert character enum to <Character>
        character: CharacterIds[clip.character],
        // convert player STRING to <Player> ...somehow
        player: Player[clip['player']]
      }
    })

    setClips(fixedClips);
  }

  return (
    <StrictMode>
      <Toaster 
        position="bottom-center"
        toastOptions={{
          duration: 2000,
          style: {}
        }}
      />
      <LivesContext.Provider value={{lives: lives, setLives: setLives}}>
        <ClipsContext.Provider value={{Clips: clips, getClips: getClips}}>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<NavbarPage />} />
            </Routes>
            <Routes>
              <Route path="/" element={ <Home /> } />
              <Route path="/play" element={ <Play /> } />
            </Routes>
          </BrowserRouter>
        </ClipsContext.Provider>
      </LivesContext.Provider>
    </StrictMode>
  );
}

export default App;