import { SvgIcon } from "@suid/material";
import { createMemo, For, Show } from "solid-js";
import { characterNameByExternalId } from "~/common/ids";
import { RenderData, replayStore } from "~/state/replayStore";
import { getPlayerOnFrame, getStartOfAction } from "~/viewer/viewerUtil";

export function Players() {
  return (
    <>
      <For each={replayStore.renderDatas}>
        {(renderData) => (
          <>
            <path
              transform={renderData.transforms.join(" ")}
              d={renderData.path}
              fill={renderData.innerColor}
              stroke-width={2}
              stroke={renderData.outerColor}
              />
              {/* todo only show on player to guess */}
            <path 
              // transform="translate(10, 10)"
              transform={`${renderData.transforms[0]} scale(1,-1) translate(-2.5, -40)`}
              fill-opacity={.4}
              fill="red"
              // transform="scale(.1 -.1) translate(-500 -500)"
              d="M7.987 5.653a4.536 4.536 0 0 1-.149 1.213 4.276 4.276 0 0 1-.389.958 5.186 5.186 0 0 1-.533.773c-.195.233-.386.454-.568.658l-.024.026c-.17.18-.328.353-.468.516a3.596 3.596 0 0 0-.4.567 2.832 2.832 0 0 0-.274.677 3.374 3.374 0 0 0-.099.858v.05a1.03 1.03 0 0 1-2.058 0v-.05a5.427 5.427 0 0 1 .167-1.385 4.92 4.92 0 0 1 .474-1.17 5.714 5.714 0 0 1 .63-.89c.158-.184.335-.38.525-.579.166-.187.34-.39.52-.603a3.108 3.108 0 0 0 .319-.464 2.236 2.236 0 0 0 .196-.495 2.466 2.466 0 0 0 .073-.66 1.891 1.891 0 0 0-.147-.762 1.944 1.944 0 0 0-.416-.633 1.917 1.917 0 0 0-.62-.418 1.758 1.758 0 0 0-.723-.144 1.823 1.823 0 0 0-.746.146 1.961 1.961 0 0 0-1.06 1.062 1.833 1.833 0 0 0-.146.747v.028a1.03 1.03 0 1 1-2.058 0v-.028a3.882 3.882 0 0 1 .314-1.56 4.017 4.017 0 0 1 2.135-2.139 3.866 3.866 0 0 1 1.561-.314 3.792 3.792 0 0 1 1.543.314A3.975 3.975 0 0 1 7.678 4.09a3.933 3.933 0 0 1 .31 1.563zm-2.738 9.81a1.337 1.337 0 0 1 0 1.033 1.338 1.338 0 0 1-.71.71l-.005.003a1.278 1.278 0 0 1-.505.103 1.338 1.338 0 0 1-1.244-.816 1.313 1.313 0 0 1 .284-1.451 1.396 1.396 0 0 1 .434-.283 1.346 1.346 0 0 1 .526-.105 1.284 1.284 0 0 1 .505.103l.005.003a1.404 1.404 0 0 1 .425.281 1.28 1.28 0 0 1 .285.418z">
            </path>
            <Shield renderData={renderData} />
            <Shine renderData={renderData} />
          </>
        )}
      </For>
    </>
  );
}

//todo shields look a bit big
function Shield(props: { renderData: RenderData }) {
  // [0,60]
  const shieldHealth = createMemo(
    () => props.renderData.playerState.shieldSize
  );
  // [0,1]. If 0 is received, set to 1 because user may have released shield
  // during a Guard-related animation. As an example, a shield must stay active
  // for 8 frames minimum before it is dropped even if the player releases the
  // trigger early.
  // For GuardDamage the shield strength is fixed and ignores trigger updates,
  // so we must walk back to the first frame of stun and read trigger there.
  const triggerStrength = createMemo(() =>
    props.renderData.animationName === "GuardDamage"
      ? getPlayerOnFrame(
          props.renderData.playerSettings.playerIndex,
          getStartOfAction(
            props.renderData.playerState,
            replayStore.replayData!
          ),
          replayStore.replayData!
        ).inputs.processed.anyTrigger
      : props.renderData.playerInputs.processed.anyTrigger === 0
      ? 1
      : props.renderData.playerInputs.processed.anyTrigger
  );
  // Formulas from https://www.ssbwiki.com/Shield#Shield_statistics
  const triggerStrengthMultiplier = createMemo(
    () => 1 - (0.5 * (triggerStrength() - 0.3)) / 0.7
  );
  const shieldSizeMultiplier = createMemo(
    () => ((shieldHealth() * triggerStrengthMultiplier()) / 60) * 0.85 + 0.15
  );
  return (
    <>
      <Show
        when={["GuardOn", "Guard", "GuardReflect", "GuardDamage"].includes(
          props.renderData.animationName
        )}
      >
        <circle
          // TODO: shield tilts
          cx={
            props.renderData.playerState.xPosition +
            props.renderData.characterData.shieldOffset[0] *
              props.renderData.playerState.facingDirection
          }
          cy={
            props.renderData.playerState.yPosition +
            props.renderData.characterData.shieldOffset[1]
          }
          r={props.renderData.characterData.shieldSize * shieldSizeMultiplier()}
          fill={props.renderData.innerColor}
          opacity={0.6}
        />
      </Show>
    </>
  );
}

function Shine(props: { renderData: RenderData }) {
  const characterName = createMemo(
    () =>
      characterNameByExternalId[
        props.renderData.playerSettings.externalCharacterId
      ]
  );
  return (
    <>
      <Show
        when={
          ["Fox", "Falco"].includes(characterName()) &&
          (props.renderData.animationName.includes("SpecialLw") ||
            props.renderData.animationName.includes("SpecialAirLw"))
        }
      >
        <Hexagon
          x={props.renderData.playerState.xPosition}
          // TODO get true shine position, shieldY * 3/4 is a guess.
          y={
            props.renderData.playerState.yPosition +
            (props.renderData.characterData.shieldOffset[1] * 3) / 4
          }
          r={6}
        />
      </Show>
    </>
  );
}

function Hexagon(props: { x: number; y: number; r: number }) {
  const hexagonHole = 0.6;
  const sideX = Math.sin((2 * Math.PI) / 6);
  const sideY = 0.5;
  const offsets = [
    [0, 1],
    [sideX, sideY],
    [sideX, -sideY],
    [0, -1],
    [-sideX, -sideY],
    [-sideX, sideY],
  ];
  const points = createMemo(() =>
    offsets
      .map(([xOffset, yOffset]) =>
        [props.r * xOffset + props.x, props.r * yOffset + props.y].join(",")
      )
      .join(",")
  );
  const maskPoints = createMemo(() =>
    offsets
      .map(([xOffset, yOffset]) =>
        [
          props.r * xOffset * hexagonHole + props.x,
          props.r * yOffset * hexagonHole + props.y,
        ].join(",")
      )
      .join(",")
  );
  return (
    <>
      <defs>
        <mask id="innerHexagon">
          <polygon points={points()} fill="white" />
          <polygon points={maskPoints()} fill="black" />
        </mask>
      </defs>
      <polygon points={points()} fill="#8abce9" mask="url(#innerHexagon)" />
    </>
  );
}
