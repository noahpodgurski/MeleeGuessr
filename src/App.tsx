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
import { ViewClips } from './pages/ViewClips';
const res = require('./consts/clips.json');

export const STARTING_STOCKS = 4;

interface ICount {
  [key: string]: number;
}

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


  const getClips = async () => {
    if (clips.length === 0){
    // if (true){

      // console.log('get clips')
      const _clips = res;
      // const shuffledClips = shuffleArray(_clips);
      const fixedClips:Clip[] = _clips.map((clip:any) => {
        if (!Player[clip['player']]){
          // find alias
          let _player = findAlias(clip['player'])
          if (!_player){
            // console.log(`cant find ${clip['player']}`)
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

      const counts:ICount = {}
      fixedClips.forEach((clip:Clip) => {
        if (counts[clip.player.label]){
          counts[clip.player.label] += 1;
        } else {
          counts[clip.player.label] = 1;
        }
      })

      // console.log(counts);

      let avg = 0;
      let count = 0;
      for (let player in counts){
        avg += counts[player];
        count++;
      }
      avg /= count
      // console.log(avg);
      
      const filteredCounts:ICount = {};
      const filteredClips = fixedClips.filter((clip:Clip) => {
        // filter out for even distribution of correct player guesses
        if (!filteredCounts[clip.player.label]){
          filteredCounts[clip.player.label] = 1;
          return true;
        }
        if (filteredCounts[clip.player.label] < avg){
          filteredCounts[clip.player.label] += 1;
          return true;
        } 
        return false;
      })
      // setClips(fixedClips);
      // console.log(fixedClips)
      // console.log(filteredClips)
      setClips(filteredClips);
    } else {
      // setClips(clips);
    }
  }

  return (
    <StrictMode>
      <StocksContext.Provider value={{stocks: stocks, setStocks: setStocks}}>
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
      </StocksContext.Provider>
    </StrictMode>
  );
}

export default App;