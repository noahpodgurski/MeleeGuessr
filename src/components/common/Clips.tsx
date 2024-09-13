import { createMutable } from "solid-js/store";
import { Clip } from "~/models/Clip";

export interface IClips {
  Clips: Clip[];
}

// const ClipsContext = createContext<IClips>();
export const ClipsContext = createMutable<IClips>({ Clips: [] });

// function Base(props: { onClose?: () => void; children: JSX.Element }) {

//   return (
//     <ClipsContext.Provider value={parts}>
//       {props.children}
//     </ClipsContext.Provider>
//   );
// }
