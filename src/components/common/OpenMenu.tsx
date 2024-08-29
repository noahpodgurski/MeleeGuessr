import * as menu from "@zag-js/menu";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { createMemo, createUniqueId, Show } from "solid-js";
import { PrimaryButton } from "~/components/common/Button";
import { filterFiles } from "~/common/util";
import { load } from "~/state/fileStore";
import { Portal } from "solid-js/web";
import { AddFolderIcon } from "~/components/common/icons";
import { setSidebar } from "~/state/navigationStore";

export function OpenMenu(props: { name?: string }) {
  const [menuState, menuSend] = useMachine(
    menu.machine({
      id: createUniqueId(),
      "aria-label": "Open Replays",
      onSelect: (value) => {
        console.log(value);
      },
    })
  );
  const api = createMemo(() =>
    menu.connect(menuState, menuSend, normalizeProps)
  );

  let fileInput!: HTMLInputElement;
  let folderInput!: HTMLInputElement;

  async function onFileSelected(e: Event): Promise<void> {
    const input = e.target as HTMLInputElement;

    if (input.files === null || input.files.length === 0) {
      return;
    }
    const files = Array.from(input.files);
    const filteredFiles = await filterFiles(files);
    await load(filteredFiles);
    setSidebar("local replays");
  }

  return (
    <>
      <div class="h-8 w-fit">
        <Show
          when={props.name}
          fallback={
            <button class="h-8 w-8 cursor-pointer" {...api().getTriggerProps()}>
              <AddFolderIcon title="Open File or Folder" />
            </button>
          }
        >
          <PrimaryButton
            {...api().getTriggerProps()}
            class="flex items-center gap-2"
          >
            {props.name}
          </PrimaryButton>
        </Show>
        <Portal>
          <div {...api().getPositionerProps()} class="bg-white opacity-100">
            <ul {...api().getContentProps()} class="border border-slate-300">
            </ul>
          </div>
        </Portal>
      </div>
      <input
        class="hidden"
        type="file"
        accept=".slp,.zip"
        multiple
        ref={fileInput}
        onChange={onFileSelected}
      />
      <input
        class="hidden"
        type="file"
        // @ts-expect-error folder input is not standard, but is supported by all
        // modern browsers
        webkitDirectory
        ref={folderInput}
        onChange={onFileSelected}
      />
    </>
  );
}
