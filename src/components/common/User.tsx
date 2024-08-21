import { createMutable } from "solid-js/store";
import { User } from "~/models/User";

export interface IUser {
  user: User | null;
}

// const UserContext = createContext<IUser>();
export const UserContext = createMutable<IUser>({ user: null });

// function Base(props: { children: JSX.Element }) {

//   return (
//     <UserContext.Provider value={parts}>
//       {props.children}
//     </UserContext.Provider>
//   );
// }
