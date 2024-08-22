import { createMemo, createUniqueId, For, Show } from "solid-js";
import { PlayerBadge } from "~/components/common/Badge";
import { Highlight } from "~/search/search";
import {
  replayStore,
} from "~/state/replayStore";
import * as accordion from "@zag-js/accordion";
import { normalizeProps, useMachine } from "@zag-js/solid";
import {
  ActionName,
  actionNameById,
  AttackName,
  attackNamesById,
} from "~/common/ids";

export function Clips() {
  const [state, send] = useMachine(
    accordion.machine({
      id: createUniqueId(),
      multiple: true,
      collapsible: true,
    })
  );
  const api = createMemo(() => accordion.connect(state, send, normalizeProps));

  return (
    <div {...api().getRootProps()}>
      <For each={Object.entries(replayStore.highlights)}>
        {([name, highlights]) => (
          <div {...api().getItemProps({ value: name })}>
            <h3>
              <button
                class="flex w-full justify-between gap-3 rounded border border-slate-400 p-2"
                classList={{
                  "text-slate-400":
                    highlights.length === 0 &&
                    name !== "customAction" &&
                    name !== "customAttack",
                }}
                {...api().getItemTriggerProps({
                  value: name,
                  disabled:
                    highlights.length === 0 &&
                    name !== "customAction" &&
                    name !== "customAttack",
                })}
              >
                <Show when={highlights.length > 0}>
                  <div class="material-icons">
                    {api().getItemState({ value: name }).expanded
                      ? "expand_less"
                      : "expand_more"}
                  </div>
                </Show>
              </button>
            </h3>
          </div>
        )}
      </For>
    </div>
  );
}