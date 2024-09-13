import { createContext, createSignal, useContext, JSX } from "solid-js";

// Define a type for the Loader context value
type LoaderContextType = [
  () => boolean, // Getter for loading state
  {
    toggle: () => void; // Function to toggle loading state
    setLoading: (v: boolean) => void; // Function to set loading state
  }
];

// Create context with default value
const LoaderContext = createContext<LoaderContextType>([
  () => false,
  {
    toggle: () => {},
    setLoading: () => {},
  },
]);

export function LoaderProvider(props: { children: JSX.Element }) {
  const [loading, setLoading] = createSignal<boolean>(false);

  const contextValue: LoaderContextType = [
    loading,
    {
      toggle() {
        setLoading(prev => !prev);
      },
      setLoading(v: boolean) {
        setLoading(v);
      }
    }
  ];

  return (
    <LoaderContext.Provider value={contextValue}>
      {props.children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  return useContext(LoaderContext);
}
