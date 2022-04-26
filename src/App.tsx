import React, { StrictMode, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavbarPage from './components/Navbar';
import { StocksContext } from './hooks/UseStocks';
import { Home } from './pages/Home';
import { Play } from './pages/Play';
import { ClipsContext } from './hooks/Clips';
import { Clip } from './models/Clip';
import { CharacterIds } from './consts/CharacterIds';
import { Player } from './consts/Player';
import { LoadingContext } from './hooks/UseLoading';
import { ViewClips } from './pages/ViewClips';
const res = require('./consts/clips.json');

export const STARTING_STOCKS = 4;

const findAlias = (player:string) => {
  for (let m in Player){
    if (m.toLowerCase() === player.toLowerCase()){
      return m;
    }
    if (Player[m].aliases){
      let aliases = Player[m].aliases || [];
      for (let alias in aliases){
        if (aliases[alias].toLowerCase() === player.toLowerCase())
          return m;
      }
    }
  }
  return null;
}

const App: React.FC = () => {
  const [stocks, setStocks] = useState(STARTING_STOCKS);
  const [clips, setClips] = useState<Clip[]>([]);
  const [loading, setLoading] = useState(false);


  const getClips = async () => {
    if (clips.length == 0){
    // if (true){

      console.log('get clips')
      // setLoading(true);
      // await new Promise(resolve => {setTimeout(() => resolve(null), 5000)});
      
      // const res:any = await fetch("/clips");
      // const _clips = await res.json();
      const _clips = res;
      // const shuffledClips = shuffleArray(_clips);
      const fixedClips:Clip[] = _clips.map((clip:any) => {
        if (!Player[clip['player']]){
          // find alias
          let _player = findAlias(clip['player'])
          if (!_player){
            console.log(`cant find ${clip['player']}`)
            // throw `${clip['player']} is not a Player object`
            // set TEST for now
            clip['player'] = "TEST";
          } else {
            clip['player'] = _player;
          }
        }
        
        return {
          ...clip,
          slp: clip.slp,
          // convert character enum to <Character>
          character: CharacterIds[clip.character],
          // convert player STRING to <Player> ...somehow
          player: Player[clip['player']],

          oppChar: CharacterIds[clip.oppChar],
          oppPlayer: clip['oppPlayer']
        }
      }) || []
      setLoading(false);
      // setClips(fixedClips);
      console.log(fixedClips)
      setClips(fixedClips);
    } else {
      // setClips(clips);
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
                <Route path="/viewclips" element={ <ViewClips /> } />
              </Routes>
            </BrowserRouter>
          </ClipsContext.Provider>
        </LoadingContext.Provider>
      </StocksContext.Provider>
    </StrictMode>
  );
}

export default App;