import { TurnipName } from "scripts/new-scripts/common/ids";
import { Match, Switch } from "solid-js";
import { useDarkMode } from "../common/Dark";

export function TurnipFace(props: { turnipName: TurnipName }) {
  // Smile - done
  // T eyes
  const [darkMode,] = useDarkMode() as any;
  const strokeColor = darkMode() ? "black" : "#fcf2e0";
  return (
    <>
      {/* leaves */}
      <path d={`M 0 0 Q 1 2, 2 0`} stroke="black" stroke-width={".3"} fill="green" />
      <path d={`M 1 1 Q 1 -.25, 3 0`} stroke="green" stroke-width={".3"} fill="transparent" />
      <path d={`M 1 1 Q 1 -.25, -1 0`} stroke="green" stroke-width={".3"} fill="transparent" />

      {/* shape */}
      <path d={`M 1 1 Q -4 0, 1 6`} stroke={darkMode() ? "#fcf2e0" : "black"} stroke-width={".2"} fill="darkgrey" />
      <path d={`M 1 1 Q 6 0, 1 6`} stroke={darkMode() ? "#fcf2e0" : "black"} stroke-width={".2"} fill="darkgrey" />
      <Switch>
      <Match when={props.turnipName === "Smile"}>
        <rect x={.5} y={1.5} width=".1" stroke-width={".1"} height="2" stroke="black" />
        <rect x={1.5} y={1.5} width=".1" stroke-width={".1"} height="2" stroke="black" />
        <path d={`M 0 4 Q 1 5, 2 4`} 
              stroke="black" stroke-width={".3"} fill="transparent" />
        
       
      </Match>
      <Match when={props.turnipName === "T Eyes"}>
        {/* aka BORED */}
        {/* left eye */}
        <rect x={.5} y={1.5} width=".1" stroke-width={".1"} height="1.75" stroke="black" />

        {/* right eye */}
        <rect x={1.5} y={1.5} width=".1" stroke-width={".1"} height="1.75" stroke="black" />

        {/* eyebrows */}
        <rect x={1.5} y={1.5} width=".75" stroke-width={".1"} height=".1" stroke="black" />
        <rect x={-.25} y={1.5} width=".75" stroke-width={".1"} height=".1" stroke="black" />

        {/* mouth */}
        <rect x={1} y={4} width=".1" stroke-width={".1"} height=".5" stroke="black" />
      </Match>
      <Match when={props.turnipName === "Line Eyes"}>
        {/* eyes */}
        <rect x={1.5} y={2.5} width="1" stroke-width={".1"} height=".1" stroke="black" />
        <rect x={-.25} y={2.5} width="1" stroke-width={".1"} height=".1" stroke="black" />

        {/* mouth */}
        <rect x={1} y={4} width=".2" stroke-width={".1"} height=".2" stroke="black" />
      </Match>
      <Match when={props.turnipName === "Circle Eyes"}>
        {/* eyes */}
        <circle
          cx={2}
          cy={2.5}
          r={.9}
          fill="transparent"
          stroke="black"
          stroke-width={.1}
        />
        <circle
          cx={0}
          cy={2.5}
          r={.9}
          fill="transparent"
          stroke="black"
          stroke-width={.1}
        />
        {/* Mouth (curve) */}
        <path d={`M .25 4.5 Q 1 3.5, 1.75 4.5`} 
              stroke="black" stroke-width={".3"} fill="black" />
      </Match>
      <Match when={props.turnipName === "Upward Curve"}>
        {/* eyes */}
        <path d={`M -.75 3.5 Q 0 -1, .75 3.5`} stroke="black" stroke-width={".3"} fill="transparent" />
        <path d={`M 1.25 3.5 Q 2 -1, 2.75 3.5`} stroke="black" stroke-width={".3"} fill="transparent" />
        
        {/* smile */}
        <path d={`M .25 4 Q 1 5, 1.5 4`} 
              stroke="black" stroke-width={".3"} fill="black" />
      </Match>
      <Match when={props.turnipName === "Wink"}>
        {/* left eye */}
        <path d={`M 2.5 2} Q 1.5 1.5, 1.25 3`} 
              stroke="black" stroke-width={".2"} fill="transparent" />
        <path d={`M 2.5 2.5 Q 1.25 2.25, 1.25 3}`} 
              stroke="black" stroke-width={".1"} fill="transparent" />
        
        {/* righteye */}
        <rect x={.5} y={1.5} width=".1" stroke-width={".1"} height="1.75" stroke="black" />

        {/* mouth */}
        <rect x={.5} y={4} width=".2" stroke-width={".1"} height=".2" stroke="black" />
      </Match>
      <Match when={props.turnipName === "Dot Eyes"}>
        {/* eyes */}
        <rect x={2} y={2.25} width=".1" stroke-width={".1"} height=".2" stroke="black" />
        <rect x={0} y={2.25} width=".1" stroke-width={".1"} height=".2" stroke="black" />
        {/* mouth */}
        <path d={`M 0} 4 Q 1 4.75, 2} 4}`} 
              stroke="black" stroke-width={".3"} fill="transparent" />
      </Match>
      <Match when={props.turnipName === "Stitch Face"}>
        <path d={`M 1.5 2 Q 1.75 2.25, 2.25 2.25`} stroke="black" stroke-width={".3"} fill="transparent" />
        <path d={`M .25 2 Q -.25 2.25, -.5 2.25`} stroke="black" stroke-width={".3"} fill="transparent" />
        <path d={`M 1.25 2.75 Q 1.75 3, 2.5 3`} stroke="black" stroke-width={".3"} fill="transparent" />
        <path d={`M .5 2.75 Q -.25 3, -.75 3`} stroke="black" stroke-width={".3"} fill="transparent" />

        <path d={`M -.25 4.25 Q 1 3.75, 2.25 4.25`} stroke="black" stroke-width={".3"} fill="transparent" />

        <path d={`M 0 3.75 Q 1 4, .25 4.5`} stroke="black" stroke-width={".1"} fill="transparent" />
        <path d={`M 2 3.75 Q 1 4, 1.75 4.5`} stroke="black" stroke-width={".1"} fill="transparent" />
        <path d={`M 1 3.75 Q 1 4, 1 4.5`} stroke="black" stroke-width={".1"} fill="transparent" />
      </Match>
    </Switch>
    </>
  )
}