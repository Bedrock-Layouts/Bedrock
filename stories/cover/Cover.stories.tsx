import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Stack } from "../../packages/stack/src/index";
import { Cover } from "../../packages/cover/src/index";
import { Component } from "./Component";
import { argTypes } from "./argTypes";
import { spacing } from "../../packages/spacing-constants/src/index";

const installCode = `
yarn add @bedrock-layout/Cover
  ## or
yarn add @bedrock-layout/primitives
`;

const importCode = `
import { Cover } from @bedrock-layout/cover
  // or
import { Cover } from '@bedrock-layout/primitives'
`;

const meta = {
  title: "Wrapper Components/Cover",
  component: Cover,
  args: {
    minHeight: "50vh",
  },
  argTypes,

  render: (args) => {
    return (
      <Cover {...args} style={{ border: "1px solid black" }}>
        <Component />
      </Cover>
    );
  },
  parameters: {
    installAndImport: {
      install: installCode,
      import: importCode,
    },
    examples: [
      {
        name: "Header Sections",
        path: "/?path=/docs/examples-basic--docs#header-sections",
      },
    ],
  },
} satisfies Meta<typeof Cover>;

export default meta;

type Story = StoryObj<typeof Cover>;

export const Playground: Story = {};

/**
 * The `top` prop can be used to render a top section.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-bedrock-cover>
 *  <span>I am on top.</span>
 *  <div data-bedrock-cover-centered>
 *    <Component />
 *  </div>
 * </div>
 *
 * // React.js and Solid.js
 * <Cover top={<span>I am on top.</span>}>
 *  <Component />
 * </Cover>
 * ```
 */
export const Top: Story = {
  args: {
    top: <span>I am on top.</span>,
  },
};

/**
 * The `bottom` prop can be used to render a bottom section.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-bedrock-cover>
 *  <div data-bedrock-cover-centered>
 *    <Component />
 *  </div>
 *  <span>I am on bottom.</span>
 * </div>
 *
 * // React.js and Solid.js
 * <Cover bottom={<span>I am on bottom.</span>}>
 *  <Component />
 * </Cover>
 * ```
 */
export const Bottom: Story = {
  args: {
    bottom: <span>I am on bottom.</span>,
  },
};

/**
 * Both the `top` and `bottom` props can be used to render
 * a top and bottom section.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-bedrock-cover>
 *  <span>I am on top.</span>
 *  <div data-bedrock-cover-centered>
 *    <Component />
 *  </div>
 *  <span>I am on bottom.</span>
 * </div>
 *
 * // React.js and Solid.js
 * <Cover top={<span>I am on top.</span>} bottom={<span>I am on bottom.</span>}>
 *  <Component />
 * </Cover>
 * ```
 */
export const TopAndBottom: Story = {
  args: {
    top: <span>I am on top.</span>,
    bottom: <span>I am on bottom.</span>,
  },
};

/**
 * The `minHeight` prop can be used to set the minimum height of the cover.
 * The default is `100vh`.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-bedrock-cover style={{"--minHeight": "500px"}}>
 *  <span>I am on top.</span>
 *  <div data-bedrock-cover-centered>
 *    <Component />
 *  </div>
 *  <span>I am on bottom.</span>
 * </div>
 *
 * // React.js and Solid.js
 * <Cover minHeight="500px" top={<span>I am on top.</span>} bottom={<span>I am on bottom.</span>}>
 *  <Component />
 * </Cover>
 * ```
 */
export const MinHeight: Story = {
  args: {
    top: <span>I am on top.</span>,
    bottom: <span>I am on bottom.</span>,
    minHeight: "500px",
    gutter: "size2",
  },
};

/**
 * The `gutter` prop defines the gutter size between elements.
 * Bedrock has implemented a default spacing scheme,
 * but [it can be overridden using the ThemeProvider provided by `@bedrock-layout/spacing-constants`.](/docs/getting-started-lesson-3-spacing--docs#integrating-with-your-design-system)
 * You can also use any valid CSSLength or positive integer.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-bedrock-cover='gutter:size3'>
 *  <span>I am on top.</span>
 *  <div data-bedrock-cover-centered>
 *    <Component />
 *  </div>
 *  <span>I am on bottom.</span>
 * </div>
 *
 * // or
 *
 * <div data-bedrock-cover style={{ "--gutter": "3ch" }}>
 *  <span>I am on top.</span>
 *  <div data-bedrock-cover-centered>
 *    <Component />
 *  </div>
 *  <span>I am on bottom.</span>
 * </div>
 *
 * // React.js and Solid.js
 * <Cover gutter="3ch" top={<span>I am on top.</span>} bottom={<span>I am on bottom.</span>}>
 *  <Component />
 * </Cover>
 * ```
 *
 * Here are the possible values for `gutter` by default:
 */
export const Gutter: Story = {
  args: {
    top: <span>I am on top.</span>,
    bottom: <span>I am on bottom.</span>,
    minHeight: 0,
  },
  render: (args) => {
    return (
      <Stack gutter="size5">
        <strong>Custom gutter as number (20)</strong>
        <Cover gutter={20} {...args}>
          <div>I am a child.</div>
        </Cover>
        <strong>Custom gutter as string ("3ch")</strong>
        <Cover gutter="3ch" {...args}>
          <div>I am a child.</div>
        </Cover>
        {(Object.keys(spacing) as Array<keyof typeof spacing>).map((gutter) => (
          <React.Fragment key={gutter}>
            <strong>{gutter}</strong>
            <Cover gutter={gutter} {...args}>
              <div>I am a child.</div>
            </Cover>
          </React.Fragment>
        ))}
      </Stack>
    );
  },
};
