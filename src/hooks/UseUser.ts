import { createContext } from "react";
import { User } from "../models/User";

export interface IUser {
  user: User | null;
  setUser: (x:User) => void;
  updateUser: () => void;
}

export const UserContext = createContext<IUser>({
  user: null,
  setUser: () => {},
  updateUser: () => {}
});