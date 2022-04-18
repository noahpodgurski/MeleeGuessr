import { createContext } from "react";

export interface ILoading {
  loading: boolean;
  setLoading: (x:boolean) => void;
}

export const LoadingContext = createContext<ILoading>({
  loading: false,
  setLoading: () => {}
});