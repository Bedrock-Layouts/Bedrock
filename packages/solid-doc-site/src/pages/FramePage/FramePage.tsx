import { Stack } from "@bedrock-layout/solid";
import { JSXElement, createSignal } from "solid-js";

import { ArgsTable } from "../../components/ArgsTable";
import { Heading } from "../../components/Heading";
import { PageSection } from "../../components/PageSection";
import { Story } from "../../components/Story";
import { argTypes } from "./argTypes";
import { Playground } from "./playground";
import playgroundCode from "./playground?raw";
import { Position } from "./position";
import positionCode from "./position?raw";
import { RatioArray } from "./ratioArray";
import ratioArrayCode from "./ratioArray?raw";
import { RatioString } from "./ratioString";
import ratioStringCode from "./ratioString?raw";
import { WithoutRatio } from "./withoutRatio";
import withoutRatioCode from "./withoutRatio?raw";

export function FramePage(): JSXElement {
  const initialValues = Object.fromEntries(
    Object.entries(argTypes).map(([key, { initialValue }]) => [
      key,
      initialValue,
    ]),
  );
  const [props, setProps] = createSignal(initialValues);

  return (
    <Stack gap="size9">
      <Heading id="title">Frame</Heading>
      <PageSection title="Use Case">
        <p>
          The `Frame` component is useful for cropping content, typically media,
          to a desired aspect ratio.
        </p>
      </PageSection>
      <PageSection title="API">
        <ArgsTable args={argTypes} />
      </PageSection>
      <PageSection title="ratio as string">
        <p>
          The `ratio` prop takes a string the is in the format of{" "}
          <code>{"number/number"}</code>, which represents the ratio of width to
          height of the desired aspect ratio.
        </p>
        <p>
          In the example below, the frame will maintain a 16:9 aspect ratio and
          will crop the image to fit.
        </p>

        <Story code={ratioStringCode}>
          <RatioString />
        </Story>
      </PageSection>
      <PageSection title="ratio as array">
        <p>
          The `ratio` prop can also take an array of two numbers, which
          represent the ratio of width to height of the desired aspect ratio.
        </p>
        <p>
          In the example below, the frame will maintain a 4:3 aspect ratio and
          will crop the image to fit.
        </p>

        <Story code={ratioArrayCode}>
          <RatioArray />
        </Story>
      </PageSection>
      <PageSection title="position">
        <p>
          By default, the media will be centered in the frame, but you can
          specify the position of the media by passing in a `position` prop. The
          `position` prop takes{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/object-position">
            any valid object-position value
          </a>{" "}
          as a string.
        </p>
        <p>
          In the example below, the frame will maintain a 4:3 aspect ratio and
          will crop the image to fit, but the image will be positioned at the
          top-left of the frame.
        </p>
        <Story code={positionCode}>
          <Position />
        </Story>
      </PageSection>
      <PageSection title="Without ratio">
        <p>
          You can also use the Frame without a ratio. This will allow you to
          specify the width and height of the frame, while still taking
          advantage of the cropping functionality.
        </p>
        <p>
          In the example below, the frame's height is set to `50vh` and its
          width is set to `50%`. The image will be cropped to fit the frame.
        </p>

        <Story code={withoutRatioCode}>
          <WithoutRatio />
        </Story>
      </PageSection>
      <PageSection title="Playground">
        <Story code={playgroundCode}>
          <Playground {...props()} />
        </Story>
        <ArgsTable
          args={argTypes}
          onChange={({ propName, value }) =>
            setProps((prev) => ({ ...prev, [propName]: value }))
          }
        />
      </PageSection>
    </Stack>
  );
}
