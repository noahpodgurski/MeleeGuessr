import { useMachine, normalizeProps } from "@zag-js/solid";
import * as dialog from "@zag-js/dialog";
import {
  Accessor,
  createContext,
  createMemo,
  createUniqueId,
  JSX,
  Show,
} from "solid-js";
import { createMutable } from "solid-js/store";
import { Portal } from "solid-js/web";

interface DialogParts {
  api: Accessor<ReturnType<typeof dialog.connect>>;
  trigger?: JSX.Element;
  title?: JSX.Element;
  contents?: JSX.Element;
}
const DialogPartsContext = createContext<DialogParts>();

export function Base(props: { onClose?: () => void; children: JSX.Element }) {
  const [state, send] = useMachine(
    dialog.machine({ id: createUniqueId() })
  );
  const api = createMemo(() => dialog.connect(state, send, normalizeProps));
  const parts = createMutable<DialogParts>({ api });

  return (
    <DialogPartsContext.Provider value={parts}>
      {/* {props.children} */} 
      {/* errors here ^^^ */}
      <button {...api().getTriggerProps()}>
        <Show when={parts.trigger}>{parts.trigger}</Show>
      </button>
      <Show when={api().open}>
        <Portal>
          <div
            {...api().getBackdropProps()}
            class="fixed inset-0 backdrop-blur-sm backdrop-brightness-90"
          />
          <div
            {...api().getPositionerProps()}
            class="fixed inset-0 flex h-screen w-screen items-center justify-center"
          >
            <div
              {...api().getContentProps()}
              class="w-full max-w-xl rounded-md border border-slate-300 bg-white p-8"
            >
              <div {...api().getTitleProps()} class="w-full">
                <Show when={parts.title}>{parts.title}</Show>
              </div>
              <div {...api().getDescriptionProps()} class="w-full">
                <Show when={parts.contents}>{parts.contents}</Show>
              </div>
            </div>
          </div>
        </Portal>
      </Show>
    </DialogPartsContext.Provider>
  );
}

export const Dialog = Object.assign(Base);
