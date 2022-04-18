import { createContext } from "react";

interface IStocks {
  stocks: number;
  setStocks: (x:number) => void;
}

export const StocksContext = createContext<IStocks>({
  stocks: 4,
  setStocks: () => {}
});