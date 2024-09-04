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
    </div>
  );
}