import { playStore } from "~/state/playStore";
import { useDarkMode } from "../common/Dark";

export function Score() {
  const [darkMode, ] = useDarkMode() as any;
  return (
    <>
      <text
        style={{ font: "bold 15px sans-serif", transform: "scaleY(-1)" }}
        text-anchor="middle"
        y="-42%"
        x="-40%"
        textContent={`Score: ${playStore.score}`}
        class={darkMode() ? "fill-slate-50" : "fill-slate-800"}
      />
    </>
  );
}
