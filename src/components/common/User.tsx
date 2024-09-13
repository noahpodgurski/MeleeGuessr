import { createMutable } from "solid-js/store";
import { User } from "~/models/User";

export interface IUser {
  user: User | null;
}

// const UserContext = createContext<IUser>();
export const UserContext = createMutable<IUser>({ user: {
  id: 'test',
  email: 'test@testy.com',
  username: 'test'
} });

// function Base(props: { children: JSX.Element }) {

//   return (
//     <UserContext.Provider value={parts}>
//       {props.children}
//     </UserContext.Provider>
//   );
// }
