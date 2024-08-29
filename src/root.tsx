import { render } from "solid-js/web";
import { App } from "~/App";
// import { App } from "./components/App";

const root = document.querySelector("#root");
if (root !== null) {
  render(App, root);
}
