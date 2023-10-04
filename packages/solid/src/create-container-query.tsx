import {
  init,
  registerCallback,
} from "@bedrock-layout/register-resize-callback";
import {
  Accessor,
  Setter,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import { convertToMaybe } from "./typeUtils";

export function createContainerQuery<T extends Element>(
  width: number,
  maybeRef?: (ref: T) => unknown,
): [Accessor<boolean>, Setter<T | undefined>] {
  const [matches, setMatch] = createSignal(false);
  const [node, nodeRef] = createSignal<T>();

  onMount(() => {
    init();
    return 0;
  });

  createEffect(() => {
    if (convertToMaybe(node()) === undefined) return 0;

    if (maybeRef) {
      maybeRef(node() as T);
    }

    const cleanup = registerCallback(node() as T, (entry) => {
      //fix typings
      const nodeWidth =
        (entry.borderBoxSize as unknown as ResizeObserverSize)?.inlineSize ??
        entry.contentRect.width;

      //nodeWidth can be zero when it is switching from one node to another.  This will ignore that.
      if (nodeWidth > 0) {
        const newMatch = nodeWidth <= width;

        setMatch(newMatch);
      }

      return 0;
    });

    onCleanup(cleanup);
    return 0;
  });

  return [matches, nodeRef];
}
