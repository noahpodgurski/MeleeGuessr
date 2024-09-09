import { createMemo, createUniqueId, For, Show } from "solid-js";
import * as accordion from "@zag-js/accordion";
import { normalizeProps, useMachine } from "@zag-js/solid";

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
    </div>
  );
}