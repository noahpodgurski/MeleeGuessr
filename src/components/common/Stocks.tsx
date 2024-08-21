import {
  createContext,
  JSX,
} from "solid-js";
import { createMutable } from "solid-js/store";

interface IStocks {
  stocks: number;
}

// const StocksContext = createContext<IStocks>();
export const StocksContext = createMutable<IStocks>({ stocks: 4 });

// function Base(props: { onClose?: () => void; children: JSX.Element }) {

//   return (
//     <StocksContext.Provider value={parts}>
//       {props.children}
//     </StocksContext.Provider>
//   );
// }
