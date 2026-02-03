import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Center } from "../../packages/center/src/index";
import { argTypes } from "./argTypes";
import { Component } from "./Component";

const installCode = `
## For React.js
yarn add @bedrock-layout/center
  ## or
yarn add @bedrock-layout/primitives

## For Solid.js
yarn add @bedrock-layout/solid
`;

const importCode = `
// For React.js
import { Center } from '@bedrock-layout/center'
  // or
import { Center } from '@bedrock-layout/primitives'

// For Solid.js
import { Center } from '@bedrock-layout/solid'
`;

const meta = {
  title: "Wrapper Components/Center",
  component: Center,
  args: {},
  argTypes,

  render: (args) => {
    return (
      <Center {...args} style={{ border: "1px solid black" }}>
        <Component />
      </Center>
    );
  },
  parameters: {
    installAndImport: {
      install: installCode,
      import: importCode,
      cssImport: "@bedrock-layout/css/lib/components/center.min.css",
    },
    examples: [
      {
        name: "Header Sections",
        path: "/?path=/docs/examples-basic--docs#header-sections",
      },
    ],
  },
} satisfies Meta<typeof Center>;

export default meta;

type Story = StoryObj<typeof Center>;

export const Playground: Story = {};

/**
 * The Center component will clamp the width at a defined `maxWidth`
 * and center itself in its context. Please note that the `maxWidth`
 * prop represents the `max-width` of the children and not the
 * Center component itself.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * // Using the predefined size constants
 * <div data-br-center="maxWidth:sizeContent3">
 *  <Component />
 * </div>
 *
 * // Or you can use a custom value directly
 * <div data-br-center style={{ "--max-width": "60ch"}}>
 *  <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <Center maxWidth="60ch">
 *  <Component />
 * </Center>
 * ```
 *
 * In the example shown below, the `maxWidth` is set to `75%`
 * of the parent component's width.
 */
export const MaxWidth: Story = {
  args: {
    maxWidth: "75%",
  },
};

/**
 * The `padding` prop allows you to add padding to the component using the design system spacing scale.
 *
 * #### Usage examples
 * ```jsx
 * // React.js and Solid.js
 * // Using predefined spacing constants
 * <Center padding="size3">
 *  <Component />
 * </Center>
 *
 * // Using CSS length
 * <Center padding="2rem">
 *  <Component />
 * </Center>
 *
 * // Using object syntax for specific sides
 * <Center padding={{ inline: "size3", block: "size2" }}>
 *  <Component />
 * </Center>
 * ```
 */
export const Padding: Story = {
  args: {
    padding: "size3",
    maxWidth: "60ch",
  },
  render: (args) => {
    return (
      <Center {...args} style={{ border: "1px solid black" }}>
        <Component />
      </Center>
    );
  },
};
