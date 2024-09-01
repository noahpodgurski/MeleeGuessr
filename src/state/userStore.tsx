import { createStore } from "solid-js/store";
export interface UserStore {
  data: any;
}

const [state, setState] = createStore<UserStore>({
  data: null
});

export const userStore = state;
export async function loadUser(_user?: string): Promise<void> {
  const user = _user ?? localStorage.getItem("user");
  if (user) {
    setState("data", user);
  }
}
