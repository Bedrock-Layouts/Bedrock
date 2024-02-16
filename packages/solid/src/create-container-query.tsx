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

/**
 * @deprecated this function is deprecated and will be removed in the next major version
 */
export function createContainerQuery<T extends Element>(
  width: number,
  maybeRef?: (ref: T) => unknown,
): [Accessor<boolean>, Setter<T | undefined>] {
  const [matches, setMatch] = createSignal(false);
  const [node, nodeRef] = createSignal<T>();

  onMount(() => {
    init();
  });

  createEffect(() => {
    if (convertToMaybe(node()) === undefined) return;

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
    });

    onCleanup(cleanup);
  });

  return [matches, nodeRef];
}
