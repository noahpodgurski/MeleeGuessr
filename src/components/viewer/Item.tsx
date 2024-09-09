import { Accessor, createMemo, For, Match, Switch } from "solid-js";
import { itemNamesById } from "~/common/ids";
import { ItemUpdate, PlayerUpdate } from "~/common/types";
import { replayStore, ReplayStore } from "~/state/replayStore";
import { TurnipFace } from "./TurnipFace";
import { turnipNamesById } from "scripts/new-scripts/common/ids";
import { useDarkMode } from "../common/Dark";

// TODO: characters projectiles

// Note: Most items coordinates and sizes are divided by 256 to convert them
// from hitboxspace to worldspace.
export function Item(props: { item: ItemUpdate, darkMode: Accessor<boolean> }) {
  const [darkMode,] = useDarkMode() as any;
  const itemName = createMemo(() => itemNamesById[props.item.typeId]);
  return (
    <Switch>
      <Match when={itemName() === "Needle(thrown)"}>
        <Needle item={props.item} darkMode={darkMode} />
      </Match>
      <Match when={itemName() === "Fox's Laser"}>
        <FoxLaser item={props.item} darkMode={darkMode} />
      </Match>
      <Match when={itemName() === "Falco's Laser"}>
        <FalcoLaser item={props.item} darkMode={darkMode} />
      </Match>
      <Match when={itemName() === "Turnip"}>
        <Turnip item={props.item} darkMode={darkMode} />
      </Match>
      <Match when={itemName() === "Yoshi's egg(thrown)"}>
        <YoshiEgg item={props.item} darkMode={darkMode} />
      </Match>
      <Match when={itemName() === "Luigi's fire"}>
        <LuigiFireball item={props.item} darkMode={darkMode} />
      </Match>
      <Match when={itemName() === "Mario's fire"}>
        <MarioFireball item={props.item} darkMode={darkMode} />
      </Match>
      <Match when={itemName() === "Missile"}>
        <Missile item={props.item} darkMode={darkMode} />
      </Match>
      <Match when={itemName() === "Samus's bomb"}>
        <SamusBomb item={props.item} darkMode={darkMode} />
      </Match>
      <Match when={itemName() === "Samus's chargeshot"}>
        <SamusChargeshot item={props.item} darkMode={darkMode} />
      </Match>
      <Match when={itemName() === "Shyguy (Heiho)"}>
        <FlyGuy item={props.item} darkMode={darkMode} />
      </Match>
      <Match when={itemName() === "Mewtwo's Shadowball"}>
        <Shadowball item={props.item} darkMode={darkMode} />
      </Match>
      <Match when={itemName() === "Pikachu's thunder (B)"}>
        <ThunderJolt item={props.item} darkMode={darkMode} />
      </Match>
      <Match when={itemName() === "Pichu's thunder (B)"}>
        <ThunderJolt item={props.item} darkMode={darkMode} />
      </Match>
      <Match when={itemName() === "Link's boomerang"}>
        <Boomerang item={props.item} darkMode={darkMode} />
      </Match>
      <Match when={itemName() === "Young Link's boomerang"}>
        <Boomerang item={props.item} darkMode={darkMode} />
      </Match>
      <Match when={itemName() === "Link's bomb"}>
        <LinkBomb item={props.item} darkMode={darkMode} />
      </Match>
      <Match when={itemName() === "Young Link's bomb"}>
        <LinkBomb item={props.item} darkMode={darkMode} />
      </Match>
      <Match when={itemName() === "Arrow"}>
        <Arrow item={props.item} darkMode={darkMode} />
      </Match>
      <Match when={itemName() === "Fire Arrow"}>
        <Arrow item={props.item} darkMode={darkMode} />
      </Match>
      <Match when={itemName() === "Blizzard"}>
        <Blizzard item={props.item} darkMode={darkMode} />
      </Match>
      <Match when={itemName() === "Ice(Iceclimbers)"}>
        <MrFreezy item={props.item} darkMode={darkMode} />
      </Match>
      <Match when={itemName() === "Kirby's Cutter beam"}>
        <KirbyCutterBeam item={props.item} darkMode={darkMode} />
      </Match>
      <Match when={itemName() === "PK Thunder (Primary)"}>
        <PKThunder item={props.item} darkMode={darkMode} />
      </Match>
      <Match when={itemName() === "PK Fire Pillar"}>
        <PKFirePillar item={props.item} darkMode={darkMode} />
      </Match>
      <Match when={itemName() === "PK Flash (explosion)"}>
        <PKFlash item={props.item} darkMode={darkMode} />
      </Match>
      <Match when={itemName() === "PK Fire"}>
        <PKFire item={props.item} darkMode={darkMode} />
      </Match>
      <Match when={itemName() === "Yoshi's Star"}>
        <YoshiStar item={props.item} darkMode={darkMode} />
      </Match>
      <Match when={itemName() === "Pill"}>
        <Pill item={props.item} darkMode={darkMode} />
      </Match>
      <Match when={itemName() === "Bowser's flame"}>
        <BowserFlame item={props.item} darkMode={darkMode} />
      </Match>
      <Match when={itemName() === "Sausage"}>
        <Sausage item={props.item} darkMode={darkMode} />
      </Match>
      
      
    </Switch>
  );
}

function SamusChargeshot(props: { item: ItemUpdate, darkMode: Accessor<boolean> }) {
  // charge levels go 0 to 7
  const hitboxesByChargeLevel = [300, 400, 500, 600, 700, 800, 900, 1200];
  return (
    <>
      <circle
        cx={props.item.xPosition + (props.item.isChargeShotLaunched ? 0 : (props.item.facingDirection === -1 ? -5: 5))}
        cy={props.item.yPosition + (props.item.isChargeShotLaunched ? 0 : (props.item.facingDirection === -1 ? -4.5: -4.5))}
        r={hitboxesByChargeLevel[props.item.chargeShotChargeLevel]*1.2 / 256}
        fill="rgba(48, 145, 230, .6)"
      />
      <circle
        cx={props.item.xPosition + (props.item.isChargeShotLaunched ? 0 : (props.item.facingDirection === -1 ? -5: 5))}
        cy={props.item.yPosition + (props.item.isChargeShotLaunched ? 0 : (props.item.facingDirection === -1 ? -4.5: -4.5))}
        r={hitboxesByChargeLevel[props.item.chargeShotChargeLevel] / 256}
        fill="rgba(233, 33, 255, .9)"
      />
      <circle
        cx={props.item.xPosition + (props.item.isChargeShotLaunched ? 0 : (props.item.facingDirection === -1 ? -5: 5))}
        cy={props.item.yPosition + (props.item.isChargeShotLaunched ? 0 : (props.item.facingDirection === -1 ? -4.5: -4.5))}
        r={hitboxesByChargeLevel[props.item.chargeShotChargeLevel]*.8 / 256}
        fill="white"
      />
    </>
  );
}

function SamusBomb(props: { item: ItemUpdate, darkMode: Accessor<boolean> }) {
  // states: 1 = falling, 3 = exploding
  if (props.item.state === 3) {
    if (props.item.expirationTimer > 60)
      return (<circle cx={props.item.xPosition} cy={props.item.yPosition} r={1300 / 256} fill="rgba(255, 0, 0, .3)"/>);
    return;
  }
  return (
    <>
      <circle
        cx={props.item.xPosition}
        cy={props.item.yPosition}
        r={(props.item.state === 3 ? 1536 : 500) / 256}
        fill='darkgrey'
      />
      <circle
        cx={props.item.xPosition}
        cy={props.item.yPosition}
        r={(props.item.state === 3 ? 1536 : 500)*.7 / 256}
        fill={props.item.frameNumber % 10 < 5 ? 'yellow' : 'red'}
      />
    </>
  );
}

function Missile(props: { item: ItemUpdate, darkMode: Accessor<boolean> }) {
  // samusMissileTypes: 0 = homing missile, 1 = smash missile
  if (props.item.state >= 2) {
    if (props.item.expirationTimer > 60)
      return (<circle cx={props.item.xPosition} cy={props.item.yPosition} r={1300 / 256} fill="rgba(255, 0, 0, .3)"/>);
    return;
  }
  return (
    <>
    {/* todo rotate towards velocity vector */}
      <g transform={``}>
        <circle
          cx={props.item.xPosition}
          cy={props.item.yPosition}
          r={(props.item.samusMissileType === 0 ? 500 : 600) / 256}
          fill="darkgray"
        />
        <circle
          cx={props.item.xPosition + (props.item.facingDirection === -1 ? -2 : 2)}
          cy={props.item.yPosition}
          r={(props.item.samusMissileType === 0 ? 500 : 600) / 256}
          fill="purple"
        />
      </g>
    </>
  );
}

function MarioFireball(props: { item: ItemUpdate, darkMode: Accessor<boolean> }) {
  return (
    <>
      <circle
        cx={props.item.xPosition}
        cy={props.item.yPosition}
        r={600 / 256}
        fill="red"
      />
    </>
  );
}

function Pill(props: { item: ItemUpdate, darkMode: Accessor<boolean> }) {
  const rotation = createMemo(() => {
    const direction = Math.atan2(props.item.yVelocity, props.item.xVelocity);
    return (direction * (180 / Math.PI) + 360) % 360;
  });
  return (
    <>
      {/* <circle
        cx={props.item.xPosition}
        cy={props.item.yPosition}
        r={800 / 256}
        fill="rgba(255, 255, 0, .3)"
      /> */}
      <g transform={`rotate(${rotation()*16} ${props.item.xPosition}, ${props.item.yPosition})`}>
        <ellipse cx={props.item.xPosition} cy={props.item.yPosition} rx={3} ry={1.25} fill="rgba(255, 0, 0, .5)"/>
      </g>
    </>
  );
}

function LuigiFireball(props: { item: ItemUpdate, darkMode: Accessor<boolean> }) {
  return (
    <>
      <circle
        cx={props.item.xPosition}
        cy={props.item.yPosition}
        r={500 / 256}
        fill="green"
      />
    </>
  );
}

function YoshiEgg(props: { item: ItemUpdate, darkMode: Accessor<boolean> }) {
  // states: 0 = held, 1 = thrown, 2 = exploded
  const ownerState = createMemo(() => getOwner(replayStore, props.item).state);
  return (
    <>
      <circle
        cx={
          props.item.state === 0 ? ownerState().xPosition : props.item.xPosition
        }
        cy={
          props.item.state === 0
            ? ownerState().yPosition + 8
            : props.item.yPosition
        }
        r={props.item.state === 2 ? 2500 / 256 : 1000 / 256}
        fill="rgba(84, 191, 56, .5)"
      />
    </>
  );
}

function YoshiStar(props: { item: ItemUpdate, darkMode: Accessor<boolean> }) {
  return (
    <>
      <circle
        cx={props.item.xPosition}
        cy={props.item.yPosition}
        r={768 / 256}
        fill={props.darkMode() ? "rgba(255, 255, 0, .5)" : "rgba(204, 198, 93, 1)"}
        opacity={.8}
      />
    </>
  );
}

function Turnip(props: { item: ItemUpdate, darkMode: Accessor<boolean> }) {
  // states: 0 = held, 1 = bouncing?, 2 = thrown, 4 = caught
  // face: props.item.peachTurnipFace
  const held = props.item.state === 0 || props.item.state === 4;
  const ownerState = createMemo(() => getOwner(replayStore, props.item).state);
  const xOffset = (held) ? ownerState().xPosition +.8 : props.item.xPosition-1;
  const yOffset = (held) ? ownerState().yPosition +11 : props.item.yPosition-3;
  const rotation = createMemo(() => {
    if (held) return 11.25;
    const direction = Math.atan2(props.item.yVelocity, props.item.xVelocity);
    return (direction * (180 / Math.PI) + 360) % 360;
  });
  return (
    <>
      <circle
        cx={props.item.xPosition}
        cy={props.item.yPosition}
        r={900/256}
        fill="blue"
        />
      <g opacity={held ? 0.5 : 1} transform={`rotate(${rotation()*16} ${held ? xOffset : props.item.xPosition}, ${held ? yOffset : props.item.yPosition}) translate(${xOffset}, ${yOffset})`}>
        <TurnipFace turnipName={turnipNamesById[props.item.peachTurnipFace]} />
      </g>
    </>
  );
}

function Needle(props: { item: ItemUpdate, darkMode: Accessor<boolean> }) {
  return (
    <>
      <circle
        cx={props.item.xPosition}
        cy={props.item.yPosition}
        r={500 / 256}
        fill="darkgray"
      />
    </>
  );
}

function FoxLaser(props: { item: ItemUpdate, darkMode: Accessor<boolean> }) {
  // There is a 4th hitbox for the first frame only at -3600 (hitboxspace) with
  // size 400 / 256 that I am skipping.
  const hitboxOffsets = [-200, -933, -1666].map((x) => x / 256);
  const hitboxSize = 300 / 256;
  // Throws and deflected lasers are not straight horizontal
  const rotations = createMemo(() => {
    const direction = Math.atan2(props.item.yVelocity, props.item.xVelocity);
    return [Math.cos(direction), Math.sin(direction)];
  });
  return (
    <>
      <line
        x1={
          props.item.xPosition +
          hitboxOffsets[0] * props.item.facingDirection * rotations()[0]
        }
        y1={
          props.item.yPosition +
          hitboxOffsets[0] * props.item.facingDirection * rotations()[1]
        }
        x2={
          props.item.xPosition +
          hitboxOffsets[hitboxOffsets.length - 1] *
            props.item.facingDirection *
            rotations()[0]
        }
        y2={
          props.item.yPosition +
          hitboxOffsets[hitboxOffsets.length - 1] *
            props.item.facingDirection *
            rotations()[1]
        }
        stroke="red"
      />
      <For each={hitboxOffsets}>
        {(hitboxOffset) => (
          <circle
            cx={
              props.item.xPosition +
              hitboxOffset * props.item.facingDirection * rotations()[0]
            }
            cy={
              props.item.yPosition +
              hitboxOffset * props.item.facingDirection * rotations()[1]
            }
            r={hitboxSize}
            fill="red"
          />
        )}
      </For>
    </>
  );
}

function FalcoLaser(props: { item: ItemUpdate, darkMode: Accessor<boolean> }) {
  const hitboxOffsets = [-200, -933, -1666, -2400].map((x) => x / 256);
  const hitboxSize = 300 / 256;
  // Throws and deflected lasers are not straight horizontal
  const rotations = createMemo(() => {
    const direction = Math.atan2(props.item.yVelocity, props.item.xVelocity);
    return [Math.cos(direction), Math.sin(direction)];
  });
  return (
    <>
      <line
        x1={props.item.xPosition + hitboxOffsets[0] * rotations()[0]}
        y1={props.item.yPosition + hitboxOffsets[0] * rotations()[1]}
        x2={
          props.item.xPosition +
          hitboxOffsets[hitboxOffsets.length - 1] * rotations()[0]
        }
        y2={
          props.item.yPosition +
          hitboxOffsets[hitboxOffsets.length - 1] * rotations()[1]
        }
        stroke="red"
      />
      <For each={hitboxOffsets}>
        {(hitboxOffset) => (
          <circle
            cx={props.item.xPosition + hitboxOffset * rotations()[0]}
            cy={props.item.yPosition + hitboxOffset * rotations()[1]}
            r={hitboxSize}
            fill="red"
          />
        )}
      </For>
    </>
  );
}

function FlyGuy(props: { item: ItemUpdate, darkMode: Accessor<boolean> }) {
  return (
    <>
      <circle
        cx={props.item.xPosition}
        cy={props.item.yPosition}
        r={5 * 0.85}
        fill="rgba(255, 0, 0, .4)"
      />
    </>
  );
}

function ThunderJolt(props: { item: ItemUpdate, darkMode: Accessor<boolean> }) {
  return (
    <>
      <circle
        cx={props.item.xPosition}
        cy={props.item.yPosition}
        r={1024/256}
        fill="rgba(255, 0, 0, .4)"
        // stroke={props.darkMode() ? "white" : "black"}
        // stroke-width={.2}
      />
    </>
  );
}

function Shadowball(props: { item: ItemUpdate, darkMode: Accessor<boolean> }) {
  // charge levels go 0 to 7
  let xPos, yPos;
  const ownerState = createMemo(() => getOwner(replayStore, props.item).state);
  if (replayStore.replayData){
    if (props.item.isChargeShotLaunched) {
      //make it wobble as it flies
      xPos = props.item.xPosition + (Math.random() * 4) - 2;
      yPos = props.item.yPosition + (Math.random() * 4) - 2;
    } else {
      //fix offset if mewtwo is in the air charging it
      const isGrounded = ownerState().isGrounded;
      //fix offset if mewtwo is charging it
      xPos = ownerState().xPosition + (props.item.facingDirection === -1 ? 5 : -5)
      yPos = ownerState().yPosition + 12 + (isGrounded ? -2 : 0)
    }
  }
  const hitboxesByChargeLevel = [300, 400, 500, 600, 700, 800, 900, 1200];
  return (
    <>
      <circle
        cx={xPos}
        cy={yPos}
        r={hitboxesByChargeLevel[props.item.chargeShotChargeLevel] / 256}
        fill="rgba(112, 70, 163, 1)"
      />
    </>
  );
}

function Boomerang(props: { item: ItemUpdate, darkMode: Accessor<boolean> }) {
  // 0 = throw/catch, 1/2/3 = flying/hitting/returning
  const ownerState = createMemo(() => getOwner(replayStore, props.item).state);
  let xPos, yPos;
  xPos = 0;
  yPos = 0;
  if (props.item.state === 0 && props.item.xVelocity === 0 && props.item.yVelocity === 0) { //throwing
    if (props.item.facingDirection === -1) {
      xPos = !ownerState().isGrounded ? ownerState().xPosition + -4 : ownerState().xPosition - 4;
      yPos = !ownerState().isGrounded ? ownerState().yPosition + 6 : ownerState().yPosition + 12;
    } else {
      xPos = !ownerState().isGrounded ? ownerState().xPosition + 0 : ownerState().xPosition + 4;
      yPos = !ownerState().isGrounded ? ownerState().yPosition + 6 : ownerState().yPosition + 12;
    }
  }
  return (
    <>
      <circle
        cx={props.item.state === 0 && props.item.xVelocity === 0 && props.item.yVelocity === 0 ? xPos : props.item.xPosition}
        cy={props.item.state === 0 && props.item.xVelocity === 0 && props.item.yVelocity === 0 ? yPos : props.item.yPosition}
        r={600 / 256}
        fill="darkgrey"
      />
    </>
  );
}

function LinkBomb(props: { item: ItemUpdate, darkMode: Accessor<boolean> }) {
  // states: 0 = held, 1 = bouncing?, 2 = thrown, 4 = caught, 5 = exploded
  if (props.item.state === 5) {
    if (props.item.expirationTimer > 60)
      // bomb impact 938 /// bomb explosion 700
      return (<circle cx={props.item.xPosition} cy={props.item.yPosition} r={938 / 256} fill="rgba(255, 0, 0, .3)"/>);
    return;
  }
  const held = props.item.state === 0 || props.item.state === 4;
  const ownerState = createMemo(() => getOwner(replayStore, props.item).state);
  const xOffset = (held) ? ownerState().xPosition +.8 : props.item.xPosition-1;
  const yOffset = (held) ? ownerState().yPosition +11 : props.item.yPosition-3;
  const rotation = createMemo(() => {
    if (held) return 11.25;
    const direction = Math.atan2(props.item.yVelocity, props.item.xVelocity);
    return (direction * (180 / Math.PI) + 360) % 360;
  });
  return (
    <>
      <g opacity={held ? 0.8 : 1} transform={`rotate(${rotation()*8} ${held ? xOffset : props.item.xPosition}, ${held ? yOffset : props.item.yPosition}) translate(${xOffset}, ${yOffset})`}>
        <circle
          cx={0}
          cy={0}
          r={600 / 256}
          fill="rgba(51, 45, 84)"
        />
      </g>
    </>
  );
}

function Arrow(props: { item: ItemUpdate, darkMode: Accessor<boolean> }) {
  if (props.item.state === 5) {
    if (props.item.expirationTimer > 60)
      // bomb impact 938 /// bomb explosion 700
      return (<circle cx={props.item.xPosition} cy={props.item.yPosition} r={938 / 256} fill="rgba(255, 0, 0, .3)"/>);
    return;
  }
  const held = props.item.state === 0;
  const ownerState = createMemo(() => getOwner(replayStore, props.item).state);
  const xOffset = (held) ? ownerState().xPosition +.8 : props.item.xPosition-1;
  const yOffset = (held) ? ownerState().yPosition +11 : props.item.yPosition-3;
  const rotation = createMemo(() => {
    if (held) return 11.25;
    const direction = Math.atan2(props.item.yVelocity, props.item.xVelocity);
    return (direction * (180 / Math.PI) + 360) % 360;
  });
  return (
    <>
      <g opacity={held ? 0.8 : 1} transform={`rotate(${rotation()} ${held ? xOffset : props.item.xPosition}, ${held ? yOffset : props.item.yPosition}) translate(${xOffset}, ${yOffset})`}>
        <circle
          cx={0}
          cy={0}
          r={600 / 256}
          fill="rgba(255, 255, 255, .5)"
        />
      </g>
    </>
  );
}

function Blizzard(props: { item: ItemUpdate, darkMode: Accessor<boolean> }) {
  return (
    <>
      <circle
        cx={props.item.xPosition}
        cy={props.item.yPosition}
        r={300 / 256}
        // stroke={props.darkMode() ? "white" : "black"}
        // stroke-width={.2}
        fill="rgba(255, 255, 255, 1)"
      />
    </>
  );
}

function MrFreezy(props: { item: ItemUpdate, darkMode: Accessor<boolean> }) {
  return (
    <>
      <circle
        cx={props.item.xPosition}
        cy={props.item.yPosition}
        r={800 / 256}
        // stroke={props.darkMode() ? "white" : "black"}
        // stroke-width={.2}
        fill="rgba(255, 255, 255, 1)"
      />
    </>
  );
}

function KirbyCutterBeam(props: { item: ItemUpdate, darkMode: Accessor<boolean> }) {
  return (
    <>
      <circle
        cx={props.item.xPosition}
        cy={props.item.yPosition+3}
        r={800 / 256}
        // stroke={props.darkMode() ? "white" : "black"}
        // stroke-width={.2}
        fill="#a8fcff"
      />
      {/* <path d={`M ${props.item.xPosition} ${props.item.yPosition} Q ${props.item.xPosition+1} ${2.5}, ${props.item.xPosition+6} ${props.item.yPosition+10}`} stroke="" stroke-width={"3"} fill="#a8fcff" /> */}
    </>
  );
}

function PKThunder(props: { item: ItemUpdate, darkMode: Accessor<boolean> }) {
  return (
    <>
      <circle
        cx={props.item.xPosition}
        cy={props.item.yPosition+3}
        r={800 / 256}
        // stroke={props.darkMode() ? "white" : "black"}
        // stroke-width={.2}
        fill="#504ead"
      />
      <circle
        cx={props.item.xPosition}
        cy={props.item.yPosition+3}
        r={600 / 256}
        fill="#a294d6"
      />
      <circle
        cx={props.item.xPosition}
        cy={props.item.yPosition+3}
        r={300 / 256}
        fill="rgba(229, 209, 255, .6)"
      />
      {/* <path d={`M ${props.item.xPosition} ${props.item.yPosition} Q ${props.item.xPosition+1} ${2.5}, ${props.item.xPosition+6} ${props.item.yPosition+10}`} stroke="" stroke-width={"3"} fill="#a8fcff" /> */}
    </>
  );
}

function PKFlash(props: { item: ItemUpdate, darkMode: Accessor<boolean> }) {
  return (
    <>
      <circle
        cx={props.item.xPosition}
        cy={props.item.yPosition}
        r={2150 / 256}
        // stroke={props.darkMode() ? "white" : "black"}
        // stroke-width={.2}
        fill="rgba(80, 191, 156, .5)"
      />
      {/* <path d={`M ${props.item.xPosition} ${props.item.yPosition} Q ${props.item.xPosition+1} ${2.5}, ${props.item.xPosition+6} ${props.item.yPosition+10}`} stroke="" stroke-width={"3"} fill="#a8fcff" /> */}
    </>
  );
}

function PKFire(props: { item: ItemUpdate, darkMode: Accessor<boolean> }) {
  return (
    <>
      <circle
        cx={props.item.xPosition}
        cy={props.item.yPosition}
        r={700 / 256}
        // stroke={props.darkMode() ? "white" : "black"}
        // stroke-width={.2}
        fill="red"
      />
      <circle
        cx={props.item.xPosition}
        cy={props.item.yPosition}
        r={500 / 256}
        // stroke={props.darkMode() ? "white" : "black"}
        // stroke-width={.2}
        fill="yellow"
      />
      {/* <path d={`M ${props.item.xPosition} ${props.item.yPosition} Q ${props.item.xPosition+1} ${2.5}, ${props.item.xPosition+6} ${props.item.yPosition+10}`} stroke="" stroke-width={"3"} fill="#a8fcff" /> */}
    </>
  );
}

function PKFirePillar(props: { item: ItemUpdate, darkMode: Accessor<boolean> }) {
  return (
    <>
      <circle
        cx={props.item.xPosition}
        cy={props.item.yPosition}
        r={(1400) / 256}
        // stroke={props.darkMode() ? "white" : "black"}
        // stroke-width={.2}
        fill="rgba(255, 0, 0, .6)"
      />
      <circle
        cx={props.item.xPosition}
        cy={props.item.yPosition}
        r={(1200) / 256}
        // stroke={props.darkMode() ? "white" : "black"}
        // stroke-width={.2}
        fill="rgba(255, 255, 0, .6)"
      />
      {/* <path d={`M ${props.item.xPosition} ${props.item.yPosition} Q ${props.item.xPosition+1} ${2.5}, ${props.item.xPosition+6} ${props.item.yPosition+10}`} stroke="" stroke-width={"3"} fill="#a8fcff" /> */}
    </>
  );
}

function BowserFlame(props: { item: ItemUpdate, darkMode: Accessor<boolean> }) {
  return (
    <>
      <circle
        cx={props.item.xPosition}
        cy={props.item.yPosition}
        r={700 / 256}
        // stroke="red"
        // stroke-width={.2}
        fill="yellow"
      />
    </>
  );
}

function Sausage(props: { item: ItemUpdate, darkMode: Accessor<boolean> }) {
  return (
    <>
      <circle
        cx={props.item.xPosition}
        cy={props.item.yPosition}
        r={500 / 256}
        // stroke={props.darkMode() ? "white" : "black"}
        // stroke-width={.2}
        fill={props.darkMode() ? "white" : "black"}
      />
    </>
  );
}

//todo pikachu down b

function getOwner(replayStore: ReplayStore, item: ItemUpdate): PlayerUpdate {
  return replayStore.replayData!.frames[item.frameNumber].players[item.owner];
}
