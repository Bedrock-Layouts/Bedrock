import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { spacing } from "../../packages/spacing-constants/src/index";
import { Split, SplitProps } from "../../packages/split/src/index";
import { Stack } from "../../packages/stack/src/index";
import { Component } from "./Component";

const installCode = `
## For React.js
yarn add @bedrock-layout/split
## or
yarn add @bedrock-layout/primitives

## For Solid.js
yarn add @bedrock-layout/solid
`;

const importCode = `
// For React.js
import { Split } from '@bedrock-layout/split'
  // or
import { Split } from '@bedrock-layout/primitives'

// For Solid.js
import { Split } from '@bedrock-layout/solid'
`;

const meta = {
  title: "Spacer Components/Split",
  component: Split,
  args: {
    gutter: "size3",
  },
  render: (args) => {
    return (
      <Split {...args}>
        <Component />
        <Component />
      </Split>
    );
  },
  parameters: {
    installAndImport: {
      install: installCode,
      import: importCode,
    },
    examples: [
      {
        name: "Product Card",
        path: "/?path=/docs/examples-basic--docs#product-card",
      },
      {
        name: "Pricing Plan",
        path: "/?path=/docs/examples-basic--docs#pricing-plan",
      },
      {
        name: "Header Sections",
        path: "/?path=/docs/examples-basic--docs#header-sections",
      },
    ],
  },
} satisfies Meta<typeof Split>;

export default meta;

type Story = StoryObj<typeof Split>;

export const Playground: Story = {};

/**
 * The `gutter` prop defines the gutter size between elements.
 * Ultimately, the space is controlled by setting the `--gutter` CSS variable.
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
 * <div data-bedrock-split='gutter:size3'>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // Or you can use a custom value directly
 * <div data-bedrock-split style={{ "--gutter": "3ch" }}>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <Split gutter="size3">
 *  <Component />
 *  <Component />
 * </Split>
 *
 * // Or you can use a css value directly
 * <Split gutter="3ch">
 *  <Component />
 *  <Component />
 * </Split>
 *
 * // or you can use a custom property
 * <Split gutter="--custom-size-4">
 *  <Component />
 *  <Component />
 * </Split>
 * ```
 *
 * Here are the possible values for `gutter` by default:
 */
export const Gutter: Story = {
  render: () => {
    return (
      <Stack gutter="size5">
        <strong>Custom gutter as number (20)</strong>
        <Split gutter={20} fraction="1/2">
          <Component />
          <Component />
        </Split>
        <strong>Custom gutter as string ("3ch")</strong>
        <Split gutter="3ch" fraction="1/2">
          <Component />
          <Component />
        </Split>
        {(Object.keys(spacing) as Array<keyof typeof spacing>).map((gutter) => (
          <React.Fragment key={gutter}>
            <strong>{gutter}</strong>
            <Split gutter={gutter} fraction="1/2">
              <Component />
              <Component />
            </Split>
          </React.Fragment>
        ))}
      </Stack>
    );
  },
};

/**
 * The `fraction` prop defines the fractional ratio of
 * host the children will be split in the container.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-bedrock-split="fraction:1/4">
 *  <Component />
 *  <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <Split fraction="1/4">
 *  <Component />
 *  <Component />
 * </Split>
 * ```
 *
 * You can use the following values:
 */
export const Fraction: Story = {
  render: () => {
    return (
      <Stack gutter="size5">
        {(
          [
            "1/4",
            "1/3",
            "1/2",
            "2/3",
            "3/4",
            "auto-start",
            "auto-end",
          ] as SplitProps["fraction"][]
        ).map((fraction) => (
          <React.Fragment key={fraction}>
            <strong>{fraction}</strong>
            <Split gutter="size3" fraction={fraction}>
              <Component />
              <Component />
            </Split>
          </React.Fragment>
        ))}
      </Stack>
    );
  },
};

/**
 * The `minItemWidth` prop defines the minimum inline size of each child.
 *
 * If the minimum inline size can not be maintained, it will move to a stacking layout.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-bedrock-split style={{--minItemWidth: '30ch'}}>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <Split minItemWidth="30ch">
 *  <Component />
 *  <Component />
 * </Split>
 * ```
 *
 * (Resize window to observe the changes)
 */
export const MinItemWidth: Story = {
  render: () => {
    return (
      <Stack gutter="size5">
        <strong>With fraction of 2/3 and minItemWidth of 40ch</strong>
        <Split gutter="size3" fraction="2/3" minItemWidth="40ch">
          <Component />
          <Component />
        </Split>
        <strong>With auto-start and minItemWidth of 30ch</strong>
        <Split gutter="size3" fraction="auto-start" minItemWidth="30ch">
          <Component />
          <Component />
        </Split>
      </Stack>
    );
  },
};

/**
 * If you set the `switchAt` property, the inline will switch to a stacking layout if the width of the element is below the threshold set by the `switchAt` property.
 *
 * This can be used with `minItemWidth` and it will switch to a stacking layout at which ever size is largest.
 *
 * The below example will switch to a stack when it is less than `45rem`.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-bedrock-split style={{--switchAt: '45rem'}}>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <Split switchAt="45rem">
 *  <Component />
 *  <Component />
 * </Split>
 * ```
 *
 * (Resize your window to see this in action.)
 */
export const SwitchAt: Story = {
  render: () => {
    return (
      <Stack gutter="size5">
        <strong>With fraction: 2/3</strong>
        <Split fraction="2/3" gutter="size2" switchAt="45rem">
          <Component />
          <Component />
        </Split>
        <strong>With auto-start with 20rem minItemWidth</strong>
        <Split
          fraction="auto-start"
          gutter="size2"
          switchAt="45rem"
          minItemWidth="20rem"
        >
          <Component />
          <Component />
        </Split>
      </Stack>
    );
  },
};
/**
 * The `Split` is designed to be used with a two children, but it can be used with more.
 * If you use more than two children, the `Split` will stack all the children underneath the first two children.
 */
export const MoreThanTwoChildren: Story = {
  args: {
    fraction: "1/3",
  },
  render: (args) => {
    return (
      <Split {...args}>
        <Component />
        <Component />
        <Component />
        <Component />
      </Split>
    );
  },
};
