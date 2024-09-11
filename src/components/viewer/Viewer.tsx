import { createMemo, For, Show } from "solid-js";
import { Camera } from "~/components/viewer/Camera";
import { HUD } from "~/components/viewer/HUD";
import { Players } from "~/components/viewer/Player";
import { Stage } from "~/components/viewer/Stage";
import { Item } from "~/components/viewer/Item";
import { replayStore } from "~/state/replayStore";
import { Controls } from "~/components/viewer/Controls";
import { useDarkMode } from "../common/Dark";
import { Score } from "./Score";
import AuthService from "~/services/auth.service";

export function Viewer() {
  const items = createMemo(
    () => {
      if (replayStore.replayData && replayStore.replayData.frames.length < replayStore.frame) return [];
      return replayStore.replayData?.frames[replayStore.frame].items ?? []
    }
  );
  const [darkMode, ] = useDarkMode() as any;
  return (
    <div class="flex flex-col overflow-y-auto pb-4">
      <Show when={replayStore.replayData}>
        <svg class={`rounded-t border ${darkMode() ? "bg-zinc-800" : "bg-slate-50"}`} viewBox="-365 -300 730 600">
          {/* up = positive y axis */}
          <g class="-scale-y-100">
            <Camera>
              <Stage />
              <Players />
              <For each={items()}>{(item) => <Item item={item} darkMode={darkMode} />}</For>
            </Camera>
            {AuthService.getCurrentUser() && <Score />}
            <HUD />
          </g>
        </svg>
        <Controls />
      </Show>
    </div>
  );
}
