import React, { StrictMode, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavbarPage from './components/Navbar';
import { StocksContext } from './hooks/UseStocks';
import { Home } from './pages/Home';
import { Play } from './pages/Play';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';
import { ClipsContext } from './hooks/Clips';
import { Clip } from './models/Clip';
import { CharacterIds } from './consts/CharacterIds';
import { Player } from './consts/Player';
import { LoadingContext } from './hooks/UseLoading';
import { ViewClips } from './pages/ViewClips';
import { useEffect } from 'react';

export const STARTING_STOCKS = 4;

const App: React.FC = () => {
  const [stocks, setStocks] = useState(STARTING_STOCKS);
  const [clips, setClips] = useState<Clip[]>([]);
  const [loading, setLoading] = useState(false);


  const getClips = async () => {
    // if (clips.length == 0){
    if (true){

      console.log('get clips')
      setLoading(true);
      // await new Promise(resolve => {setTimeout(() => resolve(null), 5000)});
      
      const res:any = await fetch("http://localhost:4000/clips");
      const _clips = await res.json();
      // console.log(_clips);
      // const shuffledClips = shuffleArray(_clips);
      const fixedClips:Clip[] = _clips.map((clip:any) => {
        if (!Player[clip['player']])
        // throw `${clip['player']} is not a Player object`
        // set TEST for now
        clip['player'] = "TEST";
        return {
          ...clip,
          slp: clip.slp,
          // convert character enum to <Character>
          character: CharacterIds[clip.character],
          // convert player STRING to <Player> ...somehow
          player: Player[clip['player']]
        }
      }) || []
      setLoading(false);
      // setClips(fixedClips);
      setClips(fixedClips);
    } else {
      setClips(clips);
      console.log('length is 0')
    }
  }

  // useEffect(() => {
  //   console.log('here to get clips')
  //   // if (clips.length === 0){
  //     getClips();
  //   // }
  // }, [useEffect])

  return (
    <StrictMode>
      <StocksContext.Provider value={{stocks: stocks, setStocks: setStocks}}>
        <LoadingContext.Provider value={{loading: loading, setLoading: setLoading}}>
          <ClipsContext.Provider value={{Clips: clips, getClips: getClips}}>
            <BrowserRouter>
              <Routes>
                <Route path="*" element={<NavbarPage />} />
              </Routes>
              <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/play" element={ <Play /> } />
                <Route path="/clips" element={ <ViewClips /> } />
              </Routes>
            </BrowserRouter>
          </ClipsContext.Provider>
        </LoadingContext.Provider>
      </StocksContext.Provider>
    </StrictMode>
  );
}

export default App;