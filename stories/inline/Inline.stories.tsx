import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Inline } from "../../packages/inline/src/index";
import { spacing } from "../../packages/spacing-constants/src/index";
import { Stack } from "../../packages/stack/src/index";
import { Component } from "./Component";

const installCode = `
yarn add @bedrock-layout/inline
  ## or
yarn add @bedrock-layout/primitives
`;

const importCode = `
import { Inline } from '@bedrock-layout/inline'
  // or
import { Inline } from '@bedrock-layout/primitives'
`;

const meta = {
  title: "Spacer Components/Inline",
  component: Inline,
  args: {
    gutter: "size3",
  },
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
    },
    examples: [],
  },
} satisfies Meta<typeof Inline>;

export default meta;

type Story = StoryObj<typeof Inline>;

export const Playground: Story = {};

/**
 * The `gutter` prop defines the gutter size between elements.
 * Bedrock has implemented a default spacing scheme,
 * but [it can be overridden using the ThemeProvider provided by `@bedrock-layout/spacing-constants`.](/docs/getting-started-lesson-3-spacing--docs#integrating-with-your-design-system)
 * You can also use any valid CSSLength or positive integer.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-bedrock-inline='gutter:size3'>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // OR
 *
 * <div data-bedrock-inline style={{ "--gutter": "3ch" }}>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <Inline gutter="3ch">
 *  <Component />
 *  <Component />
 * </Inline>
 * ```
 *
 * Here are the possible values for `gutter` by default:
 */
export const Gutter: Story = {
  render: () => {
    return (
      <Stack gutter="size5">
        <strong>Custom gutter as number (20)</strong>
        <Inline gutter={20}>
          <Component />
          <Component />
          <Component />
          <Component />
        </Inline>
        <strong>Custom gutter as string ("3ch")</strong>
        <Inline gutter="3ch">
          <Component />
          <Component />
          <Component />
          <Component />
        </Inline>
        {(Object.keys(spacing) as Array<keyof typeof spacing>).map((gutter) => (
          <React.Fragment key={gutter}>
            <strong>{gutter}</strong>
            <Inline gutter={gutter}>
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
 * values: `start`, `end`, `center`.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-bedrock-inline='justify:end'>
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
      <Stack gutter="size5">
        <strong>start</strong>
        <Inline justify="start" gutter="size7">
          <Component />
          <Component />
          <Component />
          <Component />
        </Inline>
        <strong>end</strong>
        <Inline justify="end" gutter="size7">
          <Component />
          <Component />
          <Component />
          <Component />
        </Inline>
        <strong>center</strong>
        <Inline justify="center" gutter="size7">
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
 * <div data-bedrock-inline='align:end'>
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
      <Stack gutter="size5">
        <strong>start</strong>
        <Inline align="start" gutter="size7">
          <Component style={{ height: 200 }} />
          <Component />
          <Component />
        </Inline>
        <strong>end</strong>
        <Inline align="end" gutter="size7">
          <Component style={{ height: 200 }} />
          <Component />
          <Component />
        </Inline>
        <strong>center</strong>
        <Inline align="center" gutter="size7">
          <Component style={{ height: 200 }} />
          <Component />
          <Component />
        </Inline>
        <strong>stretch</strong>
        <Inline align="stretch" gutter="size7">
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
 * <div data-bedrock-inline='stretch:end'>
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
      <Stack gutter="size5">
        <strong>start</strong>
        <Inline gutter="size3" stretch="start">
          <Component />
          <Component />
          <Component />
          <Component />
        </Inline>
        <strong>end</strong>
        <Inline gutter="size3" stretch="end">
          <Component />
          <Component />
          <Component />
          <Component />
        </Inline>
        <strong>all</strong>
        <Inline gutter="size3" stretch="all">
          <Component />
          <Component />
          <Component />
          <Component />
        </Inline>
        <strong>2 index</strong>
        <Inline gutter="size3" stretch={2}>
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
 * <div data-bedrock-inline style={{--minItemWidth: '30ch'}}>
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
      <Inline gutter="size3" minItemWidth={150}>
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
 * <div data-bedrock-inline style={{--switchAt: '30ch'}}>
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
      <Inline gutter="size3" switchAt="45rem" minItemWidth={100}>
        <Component />
        <Component />
        <Component />
        <Component />
      </Inline>
    );
  },
};
