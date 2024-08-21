import { createMutable } from "solid-js/store";

export interface ILoading {
  loading: boolean;
}

// const LoadingContext = createContext<ILoading>();
export const LoadingContext = createMutable<ILoading>({ loading: false });

// function Base(props: { children: JSX.Element }) {

//   return (
//     <LoadingContext.Provider value={parts}>
//       {props.children}
//     </LoadingContext.Provider>
//   );
// }
