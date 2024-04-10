import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Inline } from "../../packages/inline/src/index";
import { spacing } from "../../packages/spacing-constants/src/index";
import { Stack } from "../../packages/stack/src/index";
import { argTypes } from "./argTypes";
import { Component } from "./Component";

const installCode = `
## For React.js
yarn add @bedrock-layout/inline
  ## or
yarn add @bedrock-layout/primitives

## For Solid.js
yarn add @bedrock-layout/solid
`;

const importCode = `
// For React.js
import { Inline } from '@bedrock-layout/inline'
  // or
import { Inline } from '@bedrock-layout/primitives'

// For Solid.js
import { Inline } from '@bedrock-layout/solid'
`;

const meta = {
  title: "Spacer Components/Inline",
  component: Inline,
  args: {
    gap: "size3",
  },
  argTypes,
  render: (args) => {
    return (
      <Inline {...args}>
        <Component style={{ minWidth: 100 }} />
        <Component style={{ minWidth: 100 }} />
        <Component style={{ minWidth: 100 }} />
        <Component style={{ minWidth: 100 }} />
      </Inline>
    );
  },
  parameters: {
    installAndImport: {
      install: installCode,
      import: importCode,
      cssImport: "@bedrock-layout/css/lib/components/inline.min.css",
    },
    examples: [],
  },
} satisfies Meta<typeof Inline>;

export default meta;

type Story = StoryObj<typeof Inline>;

export const Playground: Story = {};

/**
 * The `gap` prop defines the gap size between elements.
 * Ultimately, the space is controlled by setting the `--gap` CSS variable.
 *
 * #### Default values
 * Bedrock has implemented a default spacing scheme,
 * but [it can be overridden using the ThemeProvider provided by `@bedrock-layout/spacing-constants`.](/docs/getting-started-lesson-3-spacing--docs#integrating-with-your-design-system)
 * You can also use any valid CSSLength or positive integer.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * // Using the predefined spacing constants
 * <div data-br-inline='gap:size3'>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // Or you can use a custom value directly
 * <div data-br-inline style={{ "--gap": "3ch" }}>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <Inline gap="size3">
 *  <Component />
 *  <Component />
 * </Inline>
 *
 * // Or you can use a css value directly
 * <Inline gap="3ch">
 *  <Component />
 *  <Component />
 * </Inline>
 *
 * // or you can use a custom property
 * <Inline gap="--custom-size-4">
 *  <Component />
 *  <Component />
 * </Inline>
 * ```
 *
 * Here are the possible values for `gap` by default:
 */
export const gap: Story = {
  render: () => {
    return (
      <Stack gap="size5">
        <strong>Custom gap as number (20)</strong>
        <Inline gap={20}>
          <Component />
          <Component />
          <Component />
          <Component />
        </Inline>
        <strong>Custom gap as string ("3ch")</strong>
        <Inline gap="3ch">
          <Component />
          <Component />
          <Component />
          <Component />
        </Inline>
        {(Object.keys(spacing) as Array<keyof typeof spacing>).map((gap) => (
          <React.Fragment key={gap}>
            <strong>{gap}</strong>
            <Inline gap={gap}>
              <Component />
              <Component />
              <Component />
              <Component />
            </Inline>
          </React.Fragment>
        ))}
      </Stack>
    );
  },
};

/**
 * The `justify` prop defines the inline justification of the
 * elements within the cluster. It accepts the following
 * values: `start`, `end`, `center`, `space-around`, `space-between`.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-br-inline='justify:end'>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <Inline justify="end">
 *  <Component />
 *  <Component />
 * </Inline>
 * ```
 */
export const Justify: Story = {
  render: () => {
    return (
      <Stack gap="size5">
        <strong>start</strong>
        <Inline justify="start" gap="size7">
          <Component />
          <Component />
          <Component />
          <Component />
        </Inline>
        <strong>end</strong>
        <Inline justify="end" gap="size7">
          <Component />
          <Component />
          <Component />
          <Component />
        </Inline>
        <strong>center</strong>
        <Inline justify="center" gap="size7">
          <Component />
          <Component />
          <Component />
          <Component />
        </Inline>
        <strong>space-around</strong>
        <Inline justify="space-around" gap="size7">
          <Component />
          <Component />
          <Component />
          <Component />
        </Inline>
        <strong>space-between</strong>
        <Inline justify="space-between" gap="size7">
          <Component />
          <Component />
          <Component />
          <Component />
        </Inline>
      </Stack>
    );
  },
};

/**
 * The `align` prop defines the vertical alignment of the
 * elements within the cluster. It accepts the following
 * values: `start`, `end`, `center`, `stretch`.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-br-inline='align:end'>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <Inline align="end">
 *  <Component />
 *  <Component />
 * </Inline>
 * ```
 */
export const Align: Story = {
  render: () => {
    return (
      <Stack gap="size5">
        <strong>start</strong>
        <Inline align="start" gap="size7">
          <Component style={{ height: 200 }} />
          <Component />
          <Component />
        </Inline>
        <strong>end</strong>
        <Inline align="end" gap="size7">
          <Component style={{ height: 200 }} />
          <Component />
          <Component />
        </Inline>
        <strong>center</strong>
        <Inline align="center" gap="size7">
          <Component style={{ height: 200 }} />
          <Component />
          <Component />
        </Inline>
        <strong>stretch</strong>
        <Inline align="stretch" gap="size7">
          <Component style={{ height: 200 }} />
          <Component />
          <Component />
        </Inline>
      </Stack>
    );
  },
};

/**
 * The `stretch` prop can be used to specify a child component that 
 * will stretch to fill the excess space.

 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-br-inline='stretch:end'>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <Inline stretch="end">
 *  <Component />
 *  <Component />
 * </Inline>
 * ```
 */
export const Stretch: Story = {
  render: () => {
    return (
      <Stack gap="size5">
        <strong>start</strong>
        <Inline gap="size3" stretch="start">
          <Component />
          <Component />
          <Component />
          <Component />
        </Inline>
        <strong>end</strong>
        <Inline gap="size3" stretch="end">
          <Component />
          <Component />
          <Component />
          <Component />
        </Inline>
        <strong>all</strong>
        <Inline gap="size3" stretch="all">
          <Component />
          <Component />
          <Component />
          <Component />
        </Inline>
        <strong>2 index</strong>
        <Inline gap="size3" stretch={2}>
          <Component />
          <Component />
          <Component />
          <Component />
        </Inline>
      </Stack>
    );
  },
};

/**
 * The `minItemWidth` prop defines the width basis of each of the children.
 *
 * Some times you want all the items to have a minimum width. By setting the
 * `minItemWidth` prop, you will set the minimum width of each of the children.
 *
 * This is especially useful with the `switchAt` prop (see below).
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * // Using the predefined size constants
 * <div data-br-inline="minItemWidth:sizeXs">
 *  <Component />
 *  <Component />
 * </div>
 *
 * // Use the `--min-item-width` custom property
 * <div data-br-inline style="--min-item-width: 30ch">
 *   <Component />
 *   <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <Inline minItemWidth="30ch">
 *   <Component />
 *   <Component />
 * </Inline>
 * ```
 *
 * In the below example, each of the Components has an intrinsic
 * width of 50px. The `minItemWidth` will make them `150px` each.
 *
 * (Resize window to observe the changes)
 */
export const MinItemWidth: Story = {
  render: () => {
    return (
      <Inline gap="size3" minItemWidth={150}>
        <Component />
        <Component />
        <Component />
        <Component />
      </Inline>
    );
  },
};

/**
 * The `switchAt` prop defines the width at which the layout will switch to stack.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * // Using the predefined size constants
 * <div data-br-inline="switchAt:sizeContent2">
 *   <Component />
 *   <Component />
 * </div>
 *
 * // use the `--switch-at` custom property
 * <div data-br-inline style="--switch-at: 30ch">
 *   <Component />
 *   <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <Inline switchAt="30ch">
 *   <Component />
 *   <Component />
 * </Inline>
 * ```
 *
 * In the below example, the layout will switch to stack when
 * its width becomes less than `45rem`.
 * (Resize your window to see this in action.)
 *
 * (Resize window to observe the changes)
 */
export const SwitchAt: Story = {
  render: () => {
    return (
      <Inline gap="size3" switchAt="45rem" minItemWidth={100}>
        <Component />
        <Component />
        <Component />
        <Component />
      </Inline>
    );
  },
};
