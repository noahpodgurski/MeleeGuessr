import { createContext, createSignal, useContext } from "solid-js";

const DarkModeContext = createContext();

export function DarkModeProvider(props: { children: any; }) {
    const [darkMode, setDarkMode] = createSignal<boolean>(true);
    const dark = [
      darkMode,
      {
        toggle() {
        setDarkMode(darkMode() === false)
        },
      }
    ];
  
    return (
      <DarkModeContext.Provider value={dark}>
        {props.children}
      </DarkModeContext.Provider>
    );
  }
  
  export function useDarkMode() { return useContext(DarkModeContext); }