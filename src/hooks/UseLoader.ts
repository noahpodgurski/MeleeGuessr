import { createContext, RefObject } from "react";

export interface ILoading {
  loaderRef?: RefObject<HTMLDivElement | null>;
  setLoading: (loading:boolean) => void;
}

export const LoadingContext = createContext<ILoading>({
  setLoading: (loading:boolean) => {}
});