import "./index.css";
import "@thisbeyond/solid-select/style.css";
import { createSignal, createContext, onMount } from 'solid-js';
import { Router, Route } from '@solidjs/router';
import './App.scss';
import './Modal.scss';
import NavbarPage from './components/Navbar';
import { Home } from './pages/Home';
import { Play } from './pages/Play';
import Leaderboards from './pages/Leaderboards';
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
          {/* <Loader /> */}
          <ThemeProvider theme={navTheme}>
            <CssBaseline />
            <NavbarPage />
          
          <Router>
            <Route path="/" component={Home} />
            <Route path="/play" component={Play} />
            <Route path="/leaderboards" component={Leaderboards} />
          </Router>
          <Toaster toastOptions={{position: 'top-center'}} />
          </ThemeProvider>
        </LoaderProvider>
      </DarkModeProvider>
    </>
  );
};
