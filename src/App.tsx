import "./index.css";
import "@thisbeyond/solid-select/style.css";
import { createSignal, createContext, onMount } from 'solid-js';
import { Router, Route } from '@solidjs/router';
import './App.scss';
import './Modal.scss';
import NavbarPage from './components/Navbar';
import { Play } from './pages/Play';
import { Clip } from './models/Clip';
import { Player } from './consts/Player';
import AuthService from './services/auth.service';
import { User } from './models/User';
// const res = require('./consts/clips.json');
// import res from "./consts/clips.json";
import { Toaster } from "solid-toast";
import { DarkModeProvider } from "./components/common/Dark";
import { createTheme, CssBaseline, ThemeProvider } from "@suid/material";
import { purple, grey } from "@suid/material/colors";
import { LoaderProvider } from "./components/common/Loader";
import { Loader } from "./components/Loader";
import { loadUser } from "./state/userStore";
export const STARTING_STOCKS = 4;

interface ICount {
  [key: string]: number;
}

const findAlias = (player: string) => {
  for (let m in Player) {
    if (m.toLowerCase() === player.toLowerCase()) {
      return m;
    }
    if (Player[m].aliases) {
      let aliases = Player[m].aliases || [];
      for (let alias in aliases) {
        if (aliases[alias].toLowerCase() === player.toLowerCase()) return m;
      }
    }
  }
  return null;
}

// Create contexts
const StocksContext = createContext();
const ClipsContext = createContext();
const UserContext = createContext();

export const App = () => {
  const [stocks, setStocks] = createSignal(STARTING_STOCKS);
  const [clips, setClips] = createSignal<Clip[]>([]);
  const [user, setUser] = createSignal<User | null>(null);

  const setLoading = (loading: boolean) => {
    // if (loading) loaderRef?.classList.remove('hidden');
    // else loaderRef?.classList.add('hidden');
  };

  onMount(() => {
    setLoading(false);
    updateUser();
    loadUser();
  });

  const updateUser = () => {
    const currentUser = AuthService.getCurrentUser();
    try {
      // const t: User = decode(currentUser);
      // setUser(t);
    } catch (err) {
      setUser(null);
    }
  };

  const getClips = async () => {
    // if (clips().length === 0) {
    //   const _clips = res;
    //   const fixedClips: Clip[] = _clips.map((clip: any) => {
    //     if (!Player[clip['player']]) {
    //       let _player = findAlias(clip['player']);
    //       if (!_player) {
    //         clip['player'] = 'TEST';
    //       } else {
    //         clip['player'] = _player;
    //       }
    //     }

    //     return {
    //       ...clip,
    //       slp: clip.slp,
    //       character: CharacterIds[clip.character],
    //       player: Player[clip['player']],
    //       oppChar: CharacterIds[clip.oppChar],
    //       oppPlayer: clip['oppPlayer']
    //     };
    //   }) || [];

    //   const counts: ICount = {};
    //   fixedClips.forEach((clip: Clip) => {
    //     if (counts[clip.player.label]) {
    //       counts[clip.player.label] += 1;
    //     } else {
    //       counts[clip.player.label] = 1;
    //     }
    //   });

    //   let avg = 0;
    //   let count = 0;
    //   for (let player in counts) {
    //     avg += counts[player];
    //     count++;
    //   }
    //   avg /= count;

    //   const filteredCounts: ICount = {};
    //   const filteredClips = fixedClips.filter((clip: Clip) => {
    //     if (!filteredCounts[clip.player.label]) {
    //       filteredCounts[clip.player.label] = 1;
    //       return true;
    //     }
    //     if (filteredCounts[clip.player.label] < avg) {
    //       filteredCounts[clip.player.label] += 1;
    //       return true;
    //     }
    //     return false;
    //   });
    //   setClips(filteredClips);
    // }
  };

  const navTheme = createTheme({
    palette: {
      mode: 'dark',
      // palette values for dark mode
      background: {
        default: purple[500],
        
      },
      text: {
        primary: '#fff',
        secondary: grey[500],
      },
    },
  })

  return (
    <>
      <DarkModeProvider>
        <LoaderProvider>
          <Loader />
          <ThemeProvider theme={navTheme}>
            <CssBaseline />
            <NavbarPage />
          </ThemeProvider>
          <Router>
            <Route path="*" component={NavbarPage} {...updateUser} />
            <Route path="/" component={Play} />
          </Router>
          <Toaster toastOptions={{position: 'top-center'}} />
        </LoaderProvider>
      </DarkModeProvider>
    </>
  );
};
