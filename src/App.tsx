import "./index.css";
import "@thisbeyond/solid-select/style.css";
import { createSignal, onMount } from 'solid-js';
import { Router, Route } from '@solidjs/router';
import './App.scss';
import './Modal.scss';
import NavbarPage from './components/Navbar';
import { Home } from './pages/Home';
import { Play } from './pages/Play';
import Leaderboards from './pages/Leaderboards';
import AuthService from './services/auth.service';
import { User } from './models/User';
// const res = require('./consts/clips.json');
// import res from "./consts/clips.json";
import { Toaster } from "solid-toast";
import { DarkModeProvider } from "./components/common/Dark";
import { createTheme, CssBaseline, ThemeProvider } from "@suid/material";
import { purple, grey } from "@suid/material/colors";
import { LoaderProvider } from "./components/common/Loader";
import { loadUser } from "./state/userStore";
import { About } from "./pages/About";
import { Result } from "./pages/Result";
import { Loader } from "./components/Loader";

export const App = () => {
  const [user, setUser] = createSignal<User | null>(null);

  onMount(() => {
    updateUser();
    loadUser();
  });

  const updateUser = () => {
    AuthService.getCurrentUser();
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
      primary: {
        main: "#91cbfa",
        light: "#b8ddfb",
        dark: "#76a0b0"
      },
      secondary: {
        main: "#6a4e85",
        light: "#87719d",
        dark: "#4a365d",
        // #7b5aa6
        // #6a4e85
      },
      text: {
        primary: '#fff',
        secondary: grey[500],
      },
    },
  })

  const Navbar = (props: any) => (
    <>
    <NavbarPage />
    <Loader />
    {props.children}
    </>
  )

  return (
    <>
      <DarkModeProvider>
        <LoaderProvider>
          {/* <Loader /> */}
          <ThemeProvider theme={navTheme}>
            <CssBaseline />
          <Router >
            <Route path="/" component={Navbar}>
              <Route path="/" component={Home} />
              <Route path="/play" component={Play} />
              <Route path="/leaderboards" component={Leaderboards} />
              <Route path="/about" component={About} />
              <Route path="/result" component={Result} />
            </Route>
          </Router>
          <Toaster toastOptions={{position: 'top-center'}} />
          </ThemeProvider>
        </LoaderProvider>
      </DarkModeProvider>
    </>
  );
};
