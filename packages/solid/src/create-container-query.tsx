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

function fail(msg: string) {
  throw new Error(msg);
}

function assertIsValidWidth(width: number | [number, number]) {
  if (typeof width !== "number" && !Array.isArray(width)) {
    fail("width must be a number or an array of two numbers");
  }

  if (
    Array<number>()
      .concat(width)
      .some((w) => w < 0)
  ) {
    fail("width value(s) must be 0 or greater");
  }

  const isInvalidArray =
    Array.isArray(width) && (width.length !== 2 || width[0] > width[1]);

  if (isInvalidArray) {
    fail(
      `The second width value, ${width[1]}, is not larger than ${width[0]}. Please provide a value greater than first width value`
    );
  }
}

export function createContainerQuery<T extends Element>(
  width: number | [number, number],
  maybeRef?: (ref: T) => void
): [Accessor<boolean>, Setter<T | undefined>] {
  assertIsValidWidth(width);

  const [matches, setMatch] = createSignal(false);
  const [node, nodeRef] = createSignal<T>();

  onMount(() => {
    init();
  });

  createEffect(() => {
    if (node() === undefined || node() === null) return;

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
        const newMatch = Array.isArray(width)
          ? nodeWidth >= width[0] && nodeWidth <= width[1]
          : nodeWidth <= width;

        setMatch(newMatch);
      }
    });

    onCleanup(cleanup);
  });

  return [matches, nodeRef];
}
